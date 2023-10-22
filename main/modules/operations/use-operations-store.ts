import { defineStore } from "pinia";
import { computed, reactive, readonly, toRefs } from "vue";

import * as main from "../../core/main.js";
import type { GetOperationActionInput } from "../../types/GetOperationActionInput.js";
import type { GetOperationsActionInput } from "../../types/GetOperationsActionInput.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { injectState } from "../common/utils/inject-state.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";
import { getOperation } from "./get-operation.js";
import { getOperations } from "./get-operations.js";
import { setDatetimeRange } from "./set-datetime-range.js";

export const useOperationsStore = defineStore("operations", () => {
  const state: OperationStoreState = reactive(getInitialOperationsStoreState());

  const actions = {
    getOperation: injectState<OperationStoreState, GetOperationActionInput>(
      getOperation,
      state,
    ),
    getOperations: injectState<OperationStoreState, GetOperationsActionInput>(
      getOperations,
      state,
    ),
    setDatetimeRange: injectState<
      OperationStoreState,
      GetOperationsActionInput
    >(setDatetimeRange, state),
  };

  const operationsByDate = computed(() =>
    main.makeOperationsByDate({
      operations: state.operations.data ?? [],
    }),
  );

  const $reset = () =>
    void Object.assign(state, getInitialOperationsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...actions,
    ...toRefs(readonly(state)),
    operationsByDate,
  };
});
