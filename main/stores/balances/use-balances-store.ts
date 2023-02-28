import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

import type { Balance } from "../../core/main.js";
import * as main from "../../core/main.js";
import type { BalancesStoreState } from "../../types/BalancesStoreState.js";
import { loadDataIntoState } from "../../utils/load-data-into-state.js";
import { getInitialBalancesStoreState } from "./get-initial-balances-store-state.js";

export const useBalancesStore = defineStore("balances", () => {
  const state: BalancesStoreState = reactive(getInitialBalancesStoreState());

  const getBalances = () => {
    if (state.balances.ready) {
      return;
    }

    loadDataIntoState<Balance[]>({
      functionToCall: () => main.getBalances(),
      stateToUpdate: state.balances,
    });
  };

  const $reset = () =>
    void Object.assign(state, getInitialBalancesStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return { state: readonly(state), getBalances, $reset };
});
