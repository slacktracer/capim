import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

import type { Account, AccountsByID } from "../core/main.js";
import * as main from "../core/main.js";

type AccountsStoreState = {
  accountsByID: AccountsByID;
  accounts: {
    data: Account[];
    error: {
      data: Record<string, unknown>;
      message: string;
    };
    loading: boolean;
  };
};

const getInitialAccountsStoreState = () => ({
  accountsByID: {},
  accounts: {
    data: [],
    error: {
      data: {},
      message: "",
    },
    loading: false,
  },
});

export const useAccountsStore = defineStore("accounts", () => {
  const state: AccountsStoreState = reactive(getInitialAccountsStoreState());

  const getAccounts = async () => {
    try {
      state.accounts.loading = true;

      state.accounts.data = await main.getAccounts();

      state.accounts.error = getInitialAccountsStoreState().accounts.error;

      state.accountsByID = main.makeAccountsByID({
        accounts: state.accounts.data,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.accounts.error.message = error.message;
      }
    } finally {
      state.accounts.loading = false;
    }
  };

  const $reset = () =>
    void Object.assign(state, getInitialAccountsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return { getAccounts, state: readonly(state), $reset };
});
