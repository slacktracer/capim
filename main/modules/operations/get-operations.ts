import { useTrackedPromise } from "../../composables/use-tracked-promise.js";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import type { OperationsByDate } from "../../core/types/OperationsByDate";
import type { GetOperations } from "../../types/GetOperations.js";
import { getOperationListID } from "./get-operation-list-id";

export const getOperations: GetOperations = ({
  bypassLocalCache = false,
  from,
  state,
  to,
}) => {
  const operationListID = getOperationListID({ from, to });

  if (state.promises[operationListID]?.isFulfilled && !bypassLocalCache) {
    return operationListID;
  }

  const trackedPromise = useTrackedPromise<
    { from: string | undefined; to: string | undefined },
    Operation[] & { byDate?: OperationsByDate }
  >({
    action: core.promiseAction.read,

    asyncFunction: core.getOperations,

    onFulfilled: (operations) => {
      operations.byDate = core.makeOperationsByDate({ operations });
    },
  });

  state.promises[operationListID] = trackedPromise;

  trackedPromise.run({ from, to });

  return operationListID;
};
