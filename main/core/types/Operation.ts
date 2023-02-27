import type { TagKey } from "./TagKey.js";
import type { TagValue } from "./TagValue.js";

export type Operation = {
  accountID: string;
  amount: number;
  amountPerUnit: number;
  at: string;
  comments: string;
  createdAt: string;
  operationID: string;
  tags: Record<TagKey["tagKeyID"], TagValue["tagValueID"]>;
  type: string;
  unitCount: number;
  updatedAt: string | null;
  userID: string;
};
