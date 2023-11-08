import type { TagKey } from "./TagKey.js";
import type { TagValue } from "./TagValue.js";

export type Operation = {
  account: {
    accountID: string;
    name: string;
  };
  accountID: string;
  amount: number;
  amountPerUnit: number;
  at: string;
  category: {
    categoryID: string;
    name: string;
  };
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
