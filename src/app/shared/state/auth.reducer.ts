import { UserModel } from "../models";
import { Action, createReducer, on } from "@ngrx/store";
import { AuthApiActions, AuthUserActions } from "src/app/auth/actions";
import produce from "immer";

export interface State {
  gettingStatus: boolean;
  user: UserModel | null;
  error: string | null;
}

export const initialState: State = {
  gettingStatus: true, // we start off by getting the status
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthApiActions.loginSuccess,
    AuthApiActions.isCurrentlyLoggedIn,
    produce((draft, action) => {
      draft.gettingStatus = false;
      draft.user = action.user;
      draft.error = null;
    })
  ),
  on(
    AuthApiActions.loginFailure,
    produce((draft, action) => {
      draft.gettingStatus = false;
      draft.user = null;
      draft.error = action.error;
    })
  ),
  on(
    AuthUserActions.logout,
    AuthApiActions.isNotCurrentlyLoggedIn,
    produce((draft, action) => {
      draft.gettingStatus = false;
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
