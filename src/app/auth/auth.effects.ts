import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../shared/services/auth.service";
import { AuthApiActions, AuthUserActions } from "./actions";

@Injectable()
export class AuthApiEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  /**
   * Auto-run this on init
   */
  checkUserIsLoggedIn$ = createEffect(() => {
    return this.authService.getStatus().pipe(
      map((user) => {
        if (user) return AuthApiActions.isCurrentlyLoggedIn({ user });
        return AuthApiActions.isNotCurrentlyLoggedIn();
      })
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
