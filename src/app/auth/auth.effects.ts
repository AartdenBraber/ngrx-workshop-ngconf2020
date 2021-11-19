import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../shared/services/auth.service";
import { AuthApiActions, AuthUserActions } from "./actions";

@Injectable()
export class AuthApiEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  checkUserIsLoggedIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthUserActions.enter),
      exhaustMap(() =>
        this.authService.getStatus().pipe(
          map((user) => {
            if (user) return AuthApiActions.isCurrentlyLoggedIn({ user });
            return AuthApiActions.isCurrentlyNotLoggedIn();
          })
        )
      )
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthUserActions.logout),
        tap(() => {
          this.authService.logout();
        })
      );
    },
    { dispatch: false }
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthUserActions.login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((user) => AuthApiActions.loginSuccess({ user })),
          catchError((error) => of(AuthApiActions.loginFailure({ error })))
        )
      )
    );
  });
}
