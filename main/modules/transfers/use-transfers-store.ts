import { defineStore } from "pinia";
import { reactive, readonly, toRefs } from "vue";

import { core } from "../../core/core.js";
import type { Transfer } from "../../core/types/Transfer.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";
import { getInitialTransfersStoreState } from "./get-initial-transfers-store-state.js";

export const useTransfersStore = defineStore("transfers", () => {
  const state = reactive(getInitialTransfersStoreState());

  const getTransfers = () => {
    if (state.transfers.ready) {
      return;
    }

    loadDataIntoState<Transfer[]>({
      functionToCall: () => core.getTransfers(),
      stateToUpdate: state.transfers,
    });
  };

  const $reset = () =>
    void Object.assign(state, getInitialTransfersStoreState());

  core.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...toRefs(readonly(state)),
    getTransfers,
  };
});
