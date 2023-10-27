import type { Account } from "../core/types/Account.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type AccountsStoreState = {
  accounts: AsyncDataState<Account[]>;
};
