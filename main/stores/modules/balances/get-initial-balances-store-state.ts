import type { Balance } from "../../../core/types/Balance.js";
import type { BalancesStoreState } from "../../../types/BalancesStoreState.js";
import { getInitialAsyncDataState } from "../../utils/get-initial-async-data-state.js";

export const getInitialBalancesStoreState = (): BalancesStoreState => ({
  balances: getInitialAsyncDataState<Balance[]>(),
});
