import { TagKey } from "~/core/types/TagKey.js";
import { TagValue } from "~/core/types/TagValue.js";

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
