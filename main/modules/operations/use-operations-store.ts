import { defineStore } from "pinia";
import { reactive, readonly, toRefs } from "vue";

import { core } from "../../core/core.js";
import type { DeleteOperation } from "../../types/DeleteOperation.js";
import type { GetOperation } from "../../types/GetOperation.js";
import type { GetOperations } from "../../types/GetOperations.js";
import type { OperationsStoreState } from "../../types/OperationsStoreState.js";
import type { PatchOperation } from "../../types/PatchOperation";
import type { PostOperation } from "../../types/PostOperation";
import type { SetDatetimeRange } from "../../types/SetDatetimeRange.js";
import { injectState } from "../common/utils/inject-state.js";
import { deleteOperation } from "./delete-operation.js";
import { getInitialOperationsStoreState } from "./get-initial-operations-store-state.js";
import { getOperation } from "./get-operation.js";
import { getOperations } from "./get-operations.js";
import { patchOperation } from "./patch-operation";
import { postOperation } from "./post-operation";
import { setDatetimeRange } from "./set-datetime-range.js";

export const useOperationsStore = defineStore("operations", () => {
  const state: OperationsStoreState = reactive(
    getInitialOperationsStoreState(),
  );

  const actions = {
    deleteOperation: injectState<DeleteOperation, OperationsStoreState>(
      deleteOperation,
      state,
    ),
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
    setDatetimeRange: injectState<SetDatetimeRange, OperationsStoreState>(
      setDatetimeRange,
      state,
    ),
    updateSaveAndClose: (value: boolean) => (state.saveAndClose = value),
  };

  const $reset = () =>
    void Object.assign(state, getInitialOperationsStoreState());

  core.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...actions,
    ...toRefs(readonly(state)),
  };
});
