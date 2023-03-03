import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

import type { Operation } from "../../../core/main.js";
import * as main from "../../../core/main.js";
import type { OperationStoreState } from "../../../types/OperationsStoreState.js";
import { loadDataIntoState } from "../../../utils/load-data-into-state.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";

export const useOperationsStore = defineStore("operations", () => {
  const state: OperationStoreState = reactive(getInitialOperationsStoreState());

  const getOperations = () => {
    if (state.operations.ready) {
      return;
    }

    loadDataIntoState<Operation[]>({
      functionToCall: () => main.getOperations(),
      stateToUpdate: state.operations,
    });
  };

  const $reset = () =>
    void Object.assign(state, getInitialOperationsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return { getOperations, state: readonly(state), $reset };
});
