import type { Balance } from "../core/types/Balance.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type BalancesStoreState = {
  balances: AsyncDataState<Balance[]>;
};
