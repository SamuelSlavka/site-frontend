import { createReducer, on } from "@ngrx/store";
import { SessionStoreActions } from ".";

export interface SessionState {
  email: string | null;
  idToken: string | null;
  loggedin: boolean;
  external: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  email: null,
  idToken: null,
  loggedin: false,
  external: false,
  isLoading: false,
  error: null,
};

export const sessionReducer = createReducer(
  initialState,
  on(
    SessionStoreActions.UserLoginRequestAction,
    SessionStoreActions.ExternalLoginRequestAction,
    SessionStoreActions.LogoutRequestAction,
    (state: SessionState): SessionState => ({
      ...state,
      error: null,
      isLoading: true,
    }),
  ),
  on(
    SessionStoreActions.UserLoginSuccessAction,
    (state: SessionState, payload): SessionState => ({
      ...state,
      ...payload,
      loggedin: true,
      external: false,
      error: null,
      isLoading: false,
    }),
  ),
  on(
    SessionStoreActions.UserLoginFailureAction,
    SessionStoreActions.ExternalLoginFailureAction,
    SessionStoreActions.LogoutFailureAction,
    (state: SessionState, payload): SessionState => ({
      ...state,
      loggedin: false,
      error: payload.error,
      isLoading: false,
    }),
  ),
  on(
    SessionStoreActions.ExternalLoginSuccessAction,
    (state: SessionState, payload): SessionState => ({
      ...state,
      ...payload,
      loggedin: true,
      external: true,
      error: null,
      isLoading: false,
    }),
  ),
  on(

    SessionStoreActions.LogoutSuccessAction,
    (state: SessionState): SessionState => ({
      ...state,
      loggedin: false,
      error: null,
      isLoading: false,
    }),
  ),
);
