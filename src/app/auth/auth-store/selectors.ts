import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { SessionState } from "./reducer";

const getError = (state: SessionState): string | null => state.error;

const getIsLoading = (state: SessionState): boolean => state.isLoading;

const getSession = (state: SessionState): SessionState | null => state;

const getIsExternal = (state: SessionState): boolean | undefined => state.external;

export const selectSessionState: MemoizedSelector<object, SessionState> = createFeatureSelector<SessionState>("session");

export const selectSessionError: MemoizedSelector<object, any> = createSelector(selectSessionState, getError);

export const selectSessionIsLoading: MemoizedSelector<object, boolean> = createSelector(
  selectSessionState,
  getIsLoading,
);

export const selectSession: MemoizedSelector<object, SessionState | null> = createSelector(selectSessionState, getSession);

export const selectIsExternal: MemoizedSelector<object, boolean | undefined> = createSelector(
  selectSessionState,
  getIsExternal,
);
