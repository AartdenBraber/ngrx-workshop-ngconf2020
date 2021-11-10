import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { BooksService } from "../shared/services";
import { BooksPageActions, BooksApiActions } from "./actions";

@Injectable()
export class BooksApiEffects {
  constructor(private actions$: Actions, private booksService: BooksService) {}

  getAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.enter),
      mergeMap(() =>
        this.booksService
          .all()
          .pipe(map((books) => BooksApiActions.loadBooksSuccess({ books })))
      )
    )
  );
}
