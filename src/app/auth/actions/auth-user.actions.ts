import { createAction, props } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";

export const logout = createAction(`[Auth user] Logout`);

export const login = createAction(
  `[Auth user] Login`,
  props<{ username: string; password: string }>()
);
