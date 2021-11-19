import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { produceOn } from "../helpers/produceOn";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import produce from "immer";

export interface State extends EntityState<BookModel> {
  activeBookId: BookModel["id"] | null | undefined;
}

const adapter = createEntityAdapter<BookModel>();

export const initialState: State = adapter.getInitialState({
  activeBookId: null,
});

export const booksReducer = createReducer(
  initialState,
  on(
    BooksPageActions.enter,
    produce((draft, action) => {
      draft = initialState;
    })
  ),

  on(
    BooksPageActions.selectBook,
    produce((draft, action) => {
      draft.activeBookId = action.id;
    })
  ),
  on(
    BooksPageActions.clearSelectedBook,
    produce((draft, action) => {
      draft.activeBookId = `undefined-${Math.random()}`; // make sure it never refers to the id of an entity, but also always trigger the change detection
    })
  ),

  on(BooksApiActions.loadBooksSuccess, (state, action) =>
    adapter.setAll(action.books, state)
  ),

  on(BooksApiActions.deleteBookSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),

  on(BooksApiActions.createBookSuccess, (state, action) =>
    adapter.addOne(action.book, state)
  ),

  on(BooksApiActions.updateBookSuccess, (state, action) =>
    adapter.updateOne({ id: action.book.id, changes: action.book }, state)
  )
);

// Make pre-Ivy happy by providing a 'real' function
export function reducer(state: State | undefined, action: Action) {
  return booksReducer(state, action);
}

/**
 * 'Getter' selectors
 */
export const selectActiveBookId = (state: State) => state.activeBookId;
export const { selectEntities, selectAll, selectIds, selectTotal } =
  adapter.getSelectors();
/**
 * Complex selectors
 */
export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (entities, activeBookId) => (activeBookId ? entities[activeBookId] : null)
);

export const selectEarningsTotal = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
