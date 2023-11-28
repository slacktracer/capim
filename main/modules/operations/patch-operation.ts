import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation";
import type { PatchOperation } from "../../types/PatchOperation";

export const patchOperation: PatchOperation = ({ operation, state }) => {
  const { operationID } = operation;

  operation.at = new Date(
    `${operation.atDate} ${operation.atTime}`,
  ).toISOString();

  state.running[operationID] = core.makeTrackedAsyncFunctionState<Operation>();

  const trackedPatchOperation = core.makeTrackedAsyncFunction<
    { operation: Operation },
    Operation
  >({
    asyncFunction: core.patchOperation,
    state: state.running[operationID],
  });

  trackedPatchOperation({ operation } as { operation: Operation });
};
