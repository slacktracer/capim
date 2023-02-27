import type { Account } from "../core/main.js";

export type AccountsStoreState = {
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
