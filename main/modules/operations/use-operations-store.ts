import { defineStore } from "pinia";
import { computed, reactive, readonly, toRefs } from "vue";
import { useRouter } from "vue-router";

import { core } from "../../core/core.js";
import type { GetOperation } from "../../types/GetOperation.js";
import type { GetOperations } from "../../types/GetOperations.js";
import type { OperationsStoreState } from "../../types/OperationsStoreState.js";
import type { PatchOperation } from "../../types/PatchOperation";
import type { PostOperation } from "../../types/PostOperation";
import type { SetDatetimeRange } from "../../types/SetDatetimeRange.js";
import { injectState } from "../common/utils/inject-state.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";
import { getOperation } from "./get-operation.js";
import { getOperations } from "./get-operations.js";
import { patchOperation } from "./patch-operation";
import { postOperation } from "./post-operation";
import { setDatetimeRange } from "./set-datetime-range.js";

export const useOperationsStore = defineStore("operations", () => {
  const router = useRouter();

  const state: OperationsStoreState = reactive(
    getInitialOperationsStoreState({ router }),
  );

  const actions = {
    getOperation: injectState<GetOperation, OperationsStoreState>(
      getOperation,
      state,
    ),
    getOperations: injectState<GetOperations, OperationsStoreState>(
      getOperations,
      state,
    ),
    patchOperation: injectState<PatchOperation, OperationsStoreState>(
      patchOperation,
      state,
    ),
    postOperation: injectState<PostOperation, OperationsStoreState>(
      postOperation,
      state,
    ),
    deleteRunningAsyncFunction: injectState<
      (input: { runningAsyncFunctionID: string }) => void,
      OperationsStoreState
    >(
      ({ runningAsyncFunctionID }) =>
        delete state.runningAsyncFunctions[runningAsyncFunctionID],
      state,
    ),
    setDatetimeRange: injectState<SetDatetimeRange, OperationsStoreState>(
      setDatetimeRange,
      state,
    ),
  };

  const operationsByDate = computed(() =>
    core.makeOperationsByDate({
      operations: state.operations.data ?? [],
    }),
  );

  const $reset = () =>
    void Object.assign(state, getInitialOperationsStoreState({ router }));

  core.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...actions,
    ...toRefs(readonly(state)),
    operationsByDate,
  };
});
