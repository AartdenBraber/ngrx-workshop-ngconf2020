import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";
import { AuthUserActions } from "../../actions";
import { LoginEvent } from "../login-form";
import {
  State,
  selectAuthError,
  selectUser,
  selectGettingAuthStatus,
} from "src/app/shared/state";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  gettingStatus$ = this.store.select(selectGettingAuthStatus);
  user$ = this.store.select(selectUser);
  error$ = this.store.select(selectAuthError);

  constructor(private store: Store<State>) {}

  onLogin($event: LoginEvent) {
    this.store.dispatch(
      AuthUserActions.login({
        password: $event.password,
        username: $event.username,
      })
    );
  }
}
