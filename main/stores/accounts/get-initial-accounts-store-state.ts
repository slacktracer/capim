import type { AccountsStoreState } from "../../types/AccountsStoreState.js";

export const getInitialAccountsStoreState = (): AccountsStoreState => ({
  accounts: {
    data: [],
    error: false,
    loading: false,
    ready: false,
    retrievedAt: undefined,
  },
});
