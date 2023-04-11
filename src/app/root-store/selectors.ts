import { createSelector, MemoizedSelector } from "@ngrx/store";
import { SessionStoreSelectors } from "./session-store";

export const selectError: MemoizedSelector<object, string> = createSelector(
  SessionStoreSelectors.selectSessionError,
  (session: string) => {
    return session;
  },
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  SessionStoreSelectors.selectSessionIsLoading,
  (session: boolean) => {
    return session;
  },
);
