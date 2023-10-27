import { defineStore } from "pinia";
import { computed, readonly, toRefs } from "vue";
import { useRouter } from "vue-router";

import { core } from "../../core/core.js";
import type { GetOperationActionInput } from "../../types/GetOperationActionInput.js";
import type { GetOperationsActionInput } from "../../types/GetOperationsActionInput.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { injectState } from "../common/utils/inject-state.js";
import { makeReactiveAndAttachRouter } from "../common/utils/make-reactive-and-attach-router.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";
import { getOperation } from "./get-operation.js";
import { getOperations } from "./get-operations.js";
import { setDatetimeRange } from "./set-datetime-range.js";

export const useOperationsStore = defineStore("operations", () => {
  const router = useRouter();

  const state: OperationStoreState =
    makeReactiveAndAttachRouter<OperationStoreState>({
      object: getInitialOperationsStoreState(),
      router,
    });

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
    core.makeOperationsByDate({
      operations: state.operations.data ?? [],
    }),
  );

  const $reset = () =>
    void Object.assign(state, getInitialOperationsStoreState());

  core.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...actions,
    ...toRefs(readonly(state)),
    operationsByDate,
  };
});
