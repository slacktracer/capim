import { defineStore } from "pinia";
import { reactive, readonly, toRefs } from "vue";

import type { Transfer } from "../../core/main.js";
import * as main from "../../core/main.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";
import { getInitialTransfersStoreState } from "./get-initial-transfers-store-state.js";

export const useTransfersStore = defineStore("transfers", () => {
  const state = reactive(getInitialTransfersStoreState());

  const getTransfers = () => {
    if (state.transfers.ready) {
      return;
    }

    loadDataIntoState<Transfer[]>({
      functionToCall: () => main.getTransfers(),
      stateToUpdate: state.transfers,
    });
  };

  const $reset = () =>
    void Object.assign(state, getInitialTransfersStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...toRefs(readonly(state)),
    getTransfers,
  };
});
