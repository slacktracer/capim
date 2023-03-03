import type { Account } from "../core/main.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type AccountsStoreState = {
  accounts: AsyncDataState<Account[]>;
};
