import { createAction, props } from "@ngrx/store";
import { BookModel, BookRequiredProps } from "src/app/shared/models";

export const loadBooks = createAction("[Books page] Load books");

export const enter = createAction("[Books page] Enter");
export const selectBook = createAction(
  "[Books page] Select book",
  props<{ id: BookModel["id"] }>()
);

export const clearSelectedBook = createAction(
  "[Books page] Clear selected book"
);

export const upsertBook = createAction(
  "[Book page] Upsert book",
  props<{ book: BookRequiredProps }>()
);
export const createBook = createAction(
  "[Book page] Create book",
  props<{ book: BookRequiredProps }>()
);
export const updateBook = createAction(
  "[Book page] Update book",
  props<{ id: BookModel["id"]; book: BookRequiredProps }>()
);

export const deleteBook = createAction(
  "[Book page] Delete book",
  props<{ id: BookModel["id"] }>()
);
