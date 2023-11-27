import type { Account } from "./Account";
import type { Category } from "./Category.js";
import type { TagKey } from "./TagKey.js";
import type { TagValue } from "./TagValue.js";

export type Operation = {
  account: Pick<Account, "accountID" | "name">;
  accountID: string;
  amount: number;
  amountPerUnit: number;
  at: string;
  category: Pick<Category, "categoryID" | "group" | "name">;
  categoryID: string;
  comments: string;
  confirmed: boolean;
  createdAt: string;
  operationID: string;
  tags: Record<TagKey["tagKeyID"], TagValue["tagValueID"]>;
  type: "Expense" | "Income";
  unitCount: number;
  updatedAt: string | null;
  userID: string;
};
