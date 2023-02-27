import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

import type { Operation } from "../../core/main.js";
import * as main from "../../core/main.js";
import { OperationStoreState } from "../../types/OperationsStoreState.js";
import { loadAsyncDataIntoReactiveState } from "../../utils/load-async-data-into-reactive-state.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";

export const useOperationsStore = defineStore("operations", () => {
  const state: OperationStoreState = reactive(getInitialOperationsStoreState());

  const getOperations = async () => {
    if (state.operations.ready) {
      return;
    }

    await loadAsyncDataIntoReactiveState<Operation[]>({
      functionToCall: main.getOperations,
      stateToMutate: state.operations,
    });
  };

  const $reset = () =>
    void Object.assign(state, getInitialOperationsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return { getOperations, state: readonly(state), $reset };
});
