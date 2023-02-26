import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

import * as main from "../../core/main.js";
import { BalancesStoreState } from "../../types/BalancesStoreState.js";
import { getInitialBalancesStoreState } from "./get-initial-balances-store-state.js";

export const useBalancesStore = defineStore("balances", () => {
  const state: BalancesStoreState = reactive(getInitialBalancesStoreState());

  const getBalances = async () => {
    state.balances.ready = false;

    state.balances.error = false;

    state.balances.loading = true;

    try {
      state.balances.data = await main.getBalances();

      state.balances.ready = true;

      state.balances.retrievedAt = new Date();
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.balances.error = { message: error.message };
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
