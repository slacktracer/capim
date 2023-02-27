import type { Account } from "./Account.js";
import type { Balance } from "./Balance.js";
import type { Operation } from "./Operation.js";
import type { TagKey } from "./TagKey.js";
import type { TagValue } from "./TagValue.js";
import type { User } from "./User.js";

export type State = {
  accounts: Account[];
  accountsByID: any;
  balances: Balance[];
  operations: Operation[];
  tagKeysByID: any;
  tags: {
    keys: TagKey[];
    values: TagValue[];
  };
  tagValuesByID: any;
  user: User | null;
};
