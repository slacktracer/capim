import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import type { GetOperation } from "../../types/GetOperation.js";

// let invalidateCount = 0;

export const getOperation: GetOperation = ({
  // invalidate,
  operationID,
  state,
}) => {
  // if (invalidate) {
  //   invalidateCount += 1;
  // }

  state.runningAsyncFunctions[operationID] =
    core.makeTrackedAsyncFunctionState<Operation>();

  const trackedGetOperation = core.makeTrackedAsyncFunction<
    { operationID: string },
    Operation
  >({
    asyncFunction: core.getOperation,
    state: state.runningAsyncFunctions[operationID],
  });

  trackedGetOperation({ operationID });
};
