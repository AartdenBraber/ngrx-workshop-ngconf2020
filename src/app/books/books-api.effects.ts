import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, exhaustMap, map, mergeMap } from "rxjs/operators";
import { BooksService } from "../shared/services";
import { BooksPageActions, BooksApiActions } from "./actions";

@Injectable()
export class BooksApiEffects {
  constructor(private actions$: Actions, private booksService: BooksService) {}

  loadAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.enter),
      exhaustMap(() =>
        this.booksService
          .all()
          .pipe(map((books) => BooksApiActions.loadBooksSuccess({ books })))
      )
    );
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.createBook),
      concatMap((action) =>
        this.booksService
          .create(action.book)
          .pipe(map((book) => BooksApiActions.createBookSuccess({ book })))
      )
    );
  });

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.updateBook),
      concatMap((action) =>
        this.booksService
          .update(action.id, action.book)
          .pipe(map((book) => BooksApiActions.updateBookSuccess({ book })))
      )
    );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.deleteBook),
      mergeMap((action) =>
        this.booksService
          .delete(action.id)
          .pipe(map(() => BooksApiActions.deleteBookSuccess({ id: action.id })))
      )
    );
  });
}
