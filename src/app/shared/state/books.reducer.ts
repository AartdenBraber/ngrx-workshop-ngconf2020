import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { produceOn } from "../helpers/produceOn";

export interface State {
  collection: Array<BookModel>;
  activeBookId: BookModel["id"] | null;
}

export const initialState: State = {
  collection: [],
  activeBookId: null,
};

export const booksReducer = createReducer(
  initialState,
  produceOn(BooksPageActions.enter, (draft, action) => {
    draft = initialState;
  }),

  produceOn(BooksPageActions.selectBook, (draft, action) => {
    draft.activeBookId = action.id;
  }),
  produceOn(BooksPageActions.clearSelectedBook, (draft, action) => {
    draft.activeBookId = null;
  }),

  produceOn(BooksApiActions.loadBooksSuccess, (draft, action) => {
    draft.collection = action.books;
  }),

  produceOn(BooksApiActions.deleteBookSuccess, (draft, action) => {
    draft.collection = draft.collection.filter((book) => book.id !== action.id);
  }),

  produceOn(BooksApiActions.createBookSuccess, (draft, action) => {
    draft.collection.push(action.book);
  }),

  produceOn(BooksApiActions.updateBookSuccess, (draft, action) => {
    for (const [index, book] of draft.collection.entries()) {
      if (book.id === action.book.id) {
        draft.collection[index] = action.book;
        return; // save resources
      }
    }
  })
);

// Make pre-Ivy happy by providing a 'real' function
export function reducer(state: State | undefined, action: Action) {
  return booksReducer(state, action);
}

/**
 * 'Getter' selectors
 */
export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;

/**
 * Complex selectors
 */
export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, activeBookId) => books.find((book) => book.id === activeBookId)
);

export const selectEarningsTotal = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
