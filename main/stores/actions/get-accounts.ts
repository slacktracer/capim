import * as main from "../../core/main.js";
import { State } from "../../core/main.js";

export const getAccounts = async (state: State) => {
  const accounts = await main.getAccounts();

  state.accounts = accounts;
};
