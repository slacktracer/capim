import type { Balance } from "../core/main.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type BalancesStoreState = {
  balances: AsyncDataState<Balance[]>;
};
