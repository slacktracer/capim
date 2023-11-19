import type { Account } from "../core/types/Account";
import type { Category } from "../core/types/Category.js";
import type { Operation } from "../core/types/Operation.js";

export type EditableOperation = Omit<
  Operation,
  "account" | "accountID" | "category" | "categoryID"
> & {
  account: Pick<Account, "accountID" | "name"> | undefined;
  accountID: Account["accountID"] | undefined;
  atDate: string;
  atTime: string;
  category: Pick<Category, "categoryID" | "group" | "name"> | undefined;
  categoryID: Category["categoryID"] | undefined;
};
