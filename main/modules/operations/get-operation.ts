import { useTrackedPromise } from "../../composables/use-tracked-promise";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import type { GetOperation } from "../../types/GetOperation.js";

export const getOperation: GetOperation = ({
  bypassLocalCache = false,
  operationID,
  state,
}) => {
  if (state.promises[operationID]?.isFulfilled && !bypassLocalCache) {
    return operationID;
  }

  const trackedPromise = useTrackedPromise<{ operationID: string }, Operation>({
    action: core.promiseAction.read,

    asyncFunction: core.getOperation,
  });

  state.promises[operationID] = trackedPromise;

  trackedPromise.run({ operationID });
};
