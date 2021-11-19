import { ActionReducer, Action, MetaReducer } from "@ngrx/store";
import produce from "immer";
import { AuthUserActions } from "src/app/auth/actions";
import { State } from ".";
import * as booksReducer from "./books.reducer";

export function logoutMetareducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state: State, action: Action) {
    if (action.type === AuthUserActions.logout.type) {
      // Reset the entire state
      return reducer(undefined, action);
    }
    return reducer(state, action);
  };
}
