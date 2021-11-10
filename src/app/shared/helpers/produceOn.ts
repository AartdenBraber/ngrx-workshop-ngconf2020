import { on } from "@ngrx/store";
import produce, { Draft } from "immer";
import {
  ActionCreator,
  ActionType,
  FunctionWithParametersType,
} from "@ngrx/store/src/models";

export function produceOn<
  Type extends string,
  C extends FunctionWithParametersType<any, object>,
  State
>(
  actionType: ActionCreator<Type, C>,
  callback: (
    draft: Draft<State>,
    action: ActionType<ActionCreator<Type, C>>
  ) => any
) {
  return on(
    actionType,
    (state: State, action): State =>
      produce(state, (draft) => callback(draft, action))
  );
}
