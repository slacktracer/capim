import { defineStore } from "pinia";
import type { Ref } from "vue";
import { readonly, ref } from "vue";

import type { Account } from "../core/main.js";
import * as main from "../core/main.js";

type AccountStoreAccounts = {
  data: Account[];
  error: {
    data: Record<string, unknown>;
    message: string;
  };
};

export const useAccountsStore = defineStore("accounts", () => {
  const accounts: Ref<AccountStoreAccounts> = ref({
    data: [],
    error: {
      data: {},
      message: "",
    },
  });

  const accountsByID: Ref<main.AccountsByID> = ref({});

  const getAccounts = async () => {
    try {
      accounts.value.data = (await main.getAccounts()) as Account[];

      accounts.value.error = { data: {}, message: "" };

      accountsByID.value = main.makeAccountsByID({
        accounts: accounts.value.data,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        accounts.value.error.message = error.message;
      }
    }
  };

  const $reset = () => {
    accounts.value = {
      data: [],
      error: {
        data: {},
        message: "",
      },
    };
  };

  main.mainEventBus.on("logout", $reset);

  return {
    accounts: readonly(accounts),
    accountsByID: readonly(accountsByID),
    getAccounts,
    $reset,
  };
});
