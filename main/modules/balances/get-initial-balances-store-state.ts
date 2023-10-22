import type * as main from "../../core/main.js";
import type { BalancesStoreState } from "../../types/BalancesStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialBalancesStoreState = (): BalancesStoreState => ({
  balances: getInitialAsyncDataState<main.Balance[]>(),
});
