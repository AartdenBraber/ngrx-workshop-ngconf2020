import { createAction, props } from "@ngrx/store";
import { BookModel } from "src/app/shared/models";

export const loadBooksSuccess = createAction(
  "[Books API] Load success",
  props<{ books: Array<BookModel> }>()
);
export const updateBookSuccess = createAction(
  "[Books API] Update book success",
  props<{ book: BookModel }>()
);
export const createBookSuccess = createAction(
  "[Books API] Create book success",
  props<{ book: BookModel }>()
);
export const deleteBookSuccess = createAction(
  "[Books API] Delete book success",
  props<{ id: BookModel["id"] }>()
);
