import type { Account } from "../core/types/Account.js";

export type AccountSelectOption = Pick<Account, "accountID" | "name">;
