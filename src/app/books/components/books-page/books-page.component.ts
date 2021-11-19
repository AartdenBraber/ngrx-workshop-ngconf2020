import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import {
  BookModel,
  calculateBooksGrossEarnings,
  BookRequiredProps,
} from "src/app/shared/models";
import {
  selectActiveBook,
  selectAllBooks,
  selectBooksEarningsTotal,
  State,
} from "src/app/shared/state";
import { BooksApiActions, BooksPageActions } from "../../actions";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"],
})
export class BooksPageComponent implements OnInit {
  total$ = this.store.select(selectBooksEarningsTotal);
  books$ = this.store.select(selectAllBooks);
  activeBook$ = this.store
    .select(selectActiveBook)
    .pipe(tap((activebook) => console.log(activebook)));

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enter());
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({ id: book.id }));
  }

  onCancel() {
    this.clearSelectedBook();
  }

  clearSelectedBook() {
    this.store.dispatch(BooksPageActions.clearSelectedBook());
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ("id" in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(book: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({ book }));
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BooksPageActions.updateBook({ id: book.id, book }));
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({ id: book.id }));
  }
}
