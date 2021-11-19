import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

export interface State {
  books: fromBooks.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer,
  auth: fromAuth.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Books state
 */
export const selectBooksState = (state: State) => state.books;
export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);
export const selectActiveBook = createSelector(
  selectBooksState,
  fromBooks.selectActiveBook
);
export const selectBooksEarningsTotal = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotal
);

/**
 * User state
 */
export const selectAuthState = (state: State) => state.auth;
export const selectUser = createSelector(selectAuthState, fromAuth.selectUser);
export const selectGettingStatus = createSelector(
  selectAuthState,
  fromAuth.selectGettingStatus
);
export const selectError = createSelector(
  selectAuthState,
  fromAuth.selectError
);
