import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserModel } from "src/app/shared/models";
import { Store } from "@ngrx/store";
import { State } from "src/app/shared/state";
import { AuthUserActions } from "../../actions";
import { selectUser } from "src/app/shared/state";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  user$ = this.store.select(selectUser);

  constructor(private store: Store<State>) {}

  handleLogout() {
    this.store.dispatch(AuthUserActions.logout());
  }
}
