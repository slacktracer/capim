import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation";
import type { EditableOperation } from "../../types/EditableOperation";
import type { PatchOperation } from "../../types/PatchOperation";

export const patchOperation: PatchOperation = ({ operation, state }) => {
  const { operationID } = operation;

  state.runningAsyncFunctions[operationID] =
    core.makeTrackedAsyncFunctionState<Operation>();

  const trackedPatchOperation = core.makeTrackedAsyncFunction<
    { operation: EditableOperation },
    Operation
  >({
    asyncFunction: core.patchOperation,
    state: state.runningAsyncFunctions[operationID],
  });

  trackedPatchOperation({ operation });
};
