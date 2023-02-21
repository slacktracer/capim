import * as main from "../../core/main.js";
import { State } from "../../core/main.js";

export const getBalances = async (state: State) => {
  const balances = await main.getBalances();

  state.balances = balances;
};
