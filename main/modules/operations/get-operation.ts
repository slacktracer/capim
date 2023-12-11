import { useTrackedPromise } from "../../composables/use-tracked-promise";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
// import { EditableOperation } from "../../types/EditableOperation";
import type { GetOperation } from "../../types/GetOperation.js";

// let invalidateCount = 0;

export const getOperation: GetOperation = ({
  // invalidate,
  operationID,
  state,
}) => {
  const trackedPromise = useTrackedPromise<{ operationID: string }, Operation>({
    asyncFunction: core.getOperation,
    onFulfilled: (_input) => {},
    onRejected: (_input) => {},
    onSettled: () => {},
  });

  state.promises[operationID] = trackedPromise;

  trackedPromise.run({ operationID });
};
