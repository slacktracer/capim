import { navigateTo } from "#app";

import * as main from "../../core/main.js";
import { State } from "../../core/main.js";
import { getMainStoreDefaultState } from "../get-main-store-default-state.js";

export const logout = async (state: State) => {
  navigateTo("/login");

  Object.assign(state, getMainStoreDefaultState());

  await main.logout();
};
