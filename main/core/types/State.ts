import { Account } from "~/core/types/Account.js";
import { Balance } from "~/core/types/Balance.js";
import { Operation } from "~/core/types/Operation.js";
import { TagKey } from "~/core/types/TagKey.js";
import { TagValue } from "~/core/types/TagValue.js";
import { User } from "~/core/types/User.js";

export type State = {
  accounts: Account[];
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
