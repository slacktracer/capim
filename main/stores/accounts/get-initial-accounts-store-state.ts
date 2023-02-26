import { AccountsStoreState } from "../../types/AccountsStoreState.js";

export const getInitialAccountsStoreState = (): AccountsStoreState => ({
  accountsByID: {},
  accounts: {
    data: [],
    error: false,
    loading: false,
    ready: false,
    retrievedAt: undefined,
  },
});
