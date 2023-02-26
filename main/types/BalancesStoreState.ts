import { Balance } from "../core/main.js";

export type BalancesStoreState = {
  balances: {
    data: Balance[];
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
