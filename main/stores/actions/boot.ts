import * as main from "../../core/main.js";
import { State } from "../../core/main.js";
import { Actions } from "../../types/Actions.js";

export const boot = async (state: State, { logout }: Actions) => {
  const initialState = await main.boot();

  if (initialState !== false) {
    if (initialState.accounts) {
      state.accounts = initialState.accounts;
    }

    Object.assign(state, initialState);
  } else {
    await logout();
  }
};
