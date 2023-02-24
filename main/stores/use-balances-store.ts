import { defineStore } from "pinia";
import type { Ref } from "vue";
import { readonly, ref } from "vue";

import * as main from "../core/main.js";
import { Balance } from "../core/main.js";

type BalanceStoreBalances = {
  data: Balance[];
  error: {
    data: Record<string, unknown>;
    message: string;
  };
};

export const useBalancesStore = defineStore("balances", () => {
  const balances: Ref<BalanceStoreBalances> = ref({
    data: [],
    error: {
      data: {},
      message: "",
    },
  });

  const getBalances = async () => {
    try {
      balances.value.data = await main.getBalances();

      balances.value.error = { data: {}, message: "" };
    } catch (error: unknown) {
      if (error instanceof Error) {
        balances.value.error.message = error.message;
      }
    }
  };

  const $reset = () => {
    balances.value = {
      data: [],
      error: {
        data: {},
        message: "",
      },
    };
  };

  main.mainEventBus.on("logout", $reset);

  return { balances: readonly(balances), getBalances, $reset };
});
