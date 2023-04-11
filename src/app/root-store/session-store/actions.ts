import { createAction, props } from "@ngrx/store";
import { IUserAuth } from "../../auth/interfaces/UserAuth";
import { IExternalAuth } from "../../auth/interfaces/ExternalAuth";

export enum ActionTypes {
  USER_LOGIN_REQUEST = "[Auth] User Login Request",
  USER_LOGIN_FAILURE = "[Auth] User Login Failure",
  USER_LOGIN_SUCCESS = "[Auth] User Login Success",
  EXTERNAL_LOGIN_REQUEST = "[Auth] External Login Request",
  EXTERNAL_LOGIN_FAILURE = "[Auth] External Login Failure",
  EXTERNAL_LOGIN_SUCCESS = "[Auth] External Login Success",
  LOGOUT_REQUEST = "[Auth] Logout Request",
  LOGOUT_LOGIN_FAILURE = "[Auth] Logout Failure",
  LOGOUT_LOGIN_SUCCESS = "[Auth] Logout Success",
}

export const UserLoginRequestAction = createAction(ActionTypes.USER_LOGIN_REQUEST, props<{ payload: IUserAuth }>());

export const UserLoginFailureAction = createAction(ActionTypes.USER_LOGIN_FAILURE, props<{ error: string }>());

export const UserLoginSuccessAction = createAction(
  ActionTypes.USER_LOGIN_SUCCESS,
  props<{ idToken: string; email: string }>(),
);

export const ExternalLoginRequestAction = createAction(
  ActionTypes.EXTERNAL_LOGIN_REQUEST,
  props<{ exteralAuth: IExternalAuth }>(),
);

export const ExternalLoginFailureAction = createAction(ActionTypes.EXTERNAL_LOGIN_FAILURE, props<{ error: string }>());

export const ExternalLoginSuccessAction = createAction(
  ActionTypes.EXTERNAL_LOGIN_SUCCESS,
  props<{ idToken: string; email: string }>(),
);

export const LogoutRequestAction = createAction(ActionTypes.LOGOUT_REQUEST);

export const LogoutFailureAction = createAction(ActionTypes.LOGOUT_LOGIN_FAILURE, props<{ error: string }>());

export const LogoutSuccessAction = createAction(ActionTypes.LOGOUT_LOGIN_SUCCESS);
