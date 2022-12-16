import { Account } from "./Account.js";
import { Balance } from "./Balance.js";
import { Operation } from "./Operation.js";
import { TagKey } from "./TagKey.js";
import { TagValue } from "./TagValue.js";
import { User } from "./User.js";

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
