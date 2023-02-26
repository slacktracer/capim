import { BalancesStoreState } from "../../types/BalancesStoreState.js";

export const getInitialBalancesStoreState = (): BalancesStoreState => ({
  balances: {
    data: [],
    error: false,
    loading: false,
    ready: false,
    retrievedAt: undefined,
  },
});
