import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation";
import type { EditableOperation } from "../../types/EditableOperation";
import type { PostOperation } from "../../types/PostOperation";

export const postOperation: PostOperation = ({ operation, state }) => {
  const operationID = core.makeUUID();

  operation.operationID = operationID;

  state.runningAsyncFunctions[operationID] =
    core.makeTrackedAsyncFunctionState<Operation>();

  const trackedPostOperation = core.makeTrackedAsyncFunction<
    { operation: EditableOperation },
    Operation
  >({
    asyncFunction: core.postOperation,
    state: state.runningAsyncFunctions[operationID],
  });

  trackedPostOperation({ operation });

  return operationID;
};
