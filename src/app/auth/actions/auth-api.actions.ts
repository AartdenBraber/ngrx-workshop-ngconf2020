import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";

export const loginSuccess = createAction(
  `[Auth api] Login success`,
  props<{ user: UserModel }>()
);

export const loginFailure = createAction(
  `[Auth api] Login failure`,
  props<{ error: string }>()
);

export const isCurrentlyLoggedIn = createAction(
  `[Auth api] User is currently logged in`,
  props<{ user: UserModel }>()
);

export const isCurrentlyNotLoggedIn = createAction(
  `[Auth api] User is currently NOT logged in`
);
