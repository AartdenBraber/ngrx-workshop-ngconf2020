import { UserModel } from "../models";
import { Action, createReducer, on } from "@ngrx/store";
import { AuthApiActions, AuthUserActions } from "src/app/auth/actions";
import produce from "immer";

export interface State {
  user: UserModel | null;
  gettingStatus: boolean;
  error: string | null;
}

export const initialState: State = {
  user: null,
  gettingStatus: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthApiActions.loginSuccess,
    AuthApiActions.isCurrentlyLoggedIn,
    produce((draft, action) => {
      draft.user = action.user;
      draft.error = null;
    })
  ),
  on(
    AuthApiActions.loginFailure,
    produce((draft, action) => {
      draft.user = null;
      draft.error = action.error;
    })
  ),
  on(
    AuthUserActions.logout,
    produce((draft, action) => {
      draft.user = null;
      draft.error = null;
    })
  )
);

// Make pre-Ivy happy by providing a 'real' function
export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

/**
 * 'Getter' selectors
 */
export const selectUser = (state: State) => state.user;
export const selectGettingStatus = (state: State) => state.gettingStatus;
export const selectError = (state: State) => state.error;
