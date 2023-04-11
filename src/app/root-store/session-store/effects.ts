import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as SessionStoreActions from "./actions";
import { AuthenticationService } from "../../auth/services/authentication.service";
import { SessionStoreSelectors } from ".";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class SessionStoreEffects {
  constructor(
    private readonly _store: Store,
    private readonly _authService: AuthenticationService,
    private readonly _toastrService: ToastrService,
    private readonly _actions$: Actions,
  ) {}

  userLoginRequestEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SessionStoreActions.UserLoginRequestAction),
      switchMap(({ payload }) =>
        this._authService.loginUser(payload).pipe(
          map((response) =>
            SessionStoreActions.UserLoginSuccessAction({ idToken: response.token, email: payload.email }),
          ),
          catchError((error) => of(SessionStoreActions.UserLoginFailureAction({ error }))),
        ),
      ),
    ),
  );

  externalLoginRequestEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SessionStoreActions.ExternalLoginRequestAction),
      switchMap(({ exteralAuth }) =>
        this._authService.validateExternal(exteralAuth).pipe(
          map((response) =>
            SessionStoreActions.ExternalLoginSuccessAction({
              idToken: response.token,
              email: exteralAuth.email,
            }),
          ),
          catchError((error) => of(SessionStoreActions.ExternalLoginFailureAction({ error }))),
        ),
      ),
    ),
  );

  logoutRequestEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(SessionStoreActions.LogoutRequestAction),
        concatLatestFrom(() => this._store.select(SessionStoreSelectors.selectIsExternal)),
        tap(([, isExternal]) => {
          if (isExternal) {
            this._authService
              .signOutWithGoogle()
              .then(() => of(SessionStoreActions.LogoutSuccessAction()))
              .catch((error) => of(SessionStoreActions.LogoutFailureAction({ error })));
          } else {
            of(SessionStoreActions.LogoutSuccessAction());
          }
        }),
      ),
    { dispatch: false },
  );

  successEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          SessionStoreActions.LogoutSuccessAction,
          SessionStoreActions.ExternalLoginSuccessAction,
          SessionStoreActions.UserLoginSuccessAction,
        ),
        tap(() => {
          this._toastrService.error("Auth action successfull");
        }),
      ),
    { dispatch: false },
  );

  failiureEffect$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          SessionStoreActions.LogoutFailureAction,
          SessionStoreActions.ExternalLoginFailureAction,
          SessionStoreActions.UserLoginFailureAction,
        ),
        tap(() => {
          this._toastrService.error("Auth action failed");
        }),
      ),
    { dispatch: false },
  );
}
