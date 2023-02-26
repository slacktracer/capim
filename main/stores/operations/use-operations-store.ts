import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

import * as main from "../../core/main.js";
import { OperationStoreState } from "../../types/OperationsStoreState.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";

export const useOperationsStore = defineStore("operations", () => {
  const state: OperationStoreState = reactive(getInitialOperationsStoreState());

  const getOperations = async () => {
    state.operations.ready = false;

    state.operations.error = false;

    state.operations.loading = true;

    try {
      state.operations.data = await main.getOperations();

      state.operations.ready = true;

      state.operations.retrievedAt = new Date();
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.operations.error = { message: error.message };
      }
    } finally {
      state.operations.loading = false;
    }
  };

  const $reset = () =>
    void Object.assign(state, getInitialOperationsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return { getOperations, state: readonly(state), $reset };
});
