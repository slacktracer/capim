import { defineStore } from "pinia";
import { reactive, readonly, toRefs } from "vue";

import { core } from "../../core/core.js";
import type { Balance } from "../../core/types/Balance.js";
import type { BalancesStoreState } from "../../types/BalancesStoreState.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";
import { getInitialBalancesStoreState } from "./get-initial-balances-store-state.js";

export const useBalancesStore = defineStore("balances", () => {
  const state: BalancesStoreState = reactive(getInitialBalancesStoreState());

  const getBalances = () => {
    if (state.balances.ready) {
      return;
    }

    loadDataIntoState<Balance[]>({
      functionToCall: () => core.getBalances(),
      stateToUpdate: state.balances,
    });
  };

  const $reset = () =>
    void Object.assign(state, getInitialBalancesStoreState());

  core.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...toRefs(readonly(state)),
    getBalances,
  };
});
