import type { Account } from "../core/types/Account.js";

export type AccountSelectorListItem = Pick<Account, "accountID" | "name">;
