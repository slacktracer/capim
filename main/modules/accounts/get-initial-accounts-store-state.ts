import type * as main from "../../core/main.js";
import type { AccountsStoreState } from "../../types/AccountsStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialAccountsStoreState = (): AccountsStoreState => ({
  accounts: getInitialAsyncDataState<main.Account[]>(),
});
