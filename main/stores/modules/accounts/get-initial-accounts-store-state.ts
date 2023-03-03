import type { Account } from "../../../core/types/Account.js";
import type { AccountsStoreState } from "../../../types/AccountsStoreState.js";
import { getInitialAsyncDataState } from "../../../utils/get-initial-async-data-state.js";

export const getInitialAccountsStoreState = (): AccountsStoreState => ({
  accounts: getInitialAsyncDataState<Account[]>(),
});
