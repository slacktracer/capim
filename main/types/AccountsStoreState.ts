import { ComputedRef } from "vue";

import { Account, AccountsByID } from "../core/main.js";

export type AccountsStoreState = {
  accountsByID: AccountsByID | ComputedRef<AccountsByID>;
  accounts: {
    data: Account[];
    error:
      | {
          data?: Record<string, unknown>;
          message: string;
        }
      | false;
    loading: boolean;
    ready: boolean;
    retrievedAt: Date | undefined;
  };
};
