import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

import type { Balance } from "../core/main.js";
import * as main from "../core/main.js";

type BalancesStoreState = {
  balances: {
    data: Balance[];
    error: {
      data: Record<string, unknown>;
      message: string;
    };
    loading: boolean;
  };
};

const getInitialBalancesStoreState = () => ({
  balances: {
    data: [],
    error: {
      data: {},
      message: "",
    },
    loading: false,
  },
});

export const useBalancesStore = defineStore("balances", () => {
  const state: BalancesStoreState = reactive(getInitialBalancesStoreState());

  const getBalances = async () => {
    try {
      state.balances.loading = true;

      state.balances.data = await main.getBalances();

      state.balances.error = getInitialBalancesStoreState().balances.error;
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.balances.error.message = error.message;
      }
    } finally {
      state.balances.loading = false;
    }
  };

  const $reset = () =>
    void Object.assign(state, getInitialBalancesStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return { state: readonly(state), getBalances, $reset };
});
