import { useTrackedPromise } from "../../composables/use-tracked-promise.js";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import type { OperationsByDate } from "../../core/types/OperationsByDate";
import type { GetOperations } from "../../types/GetOperations.js";
import { setSearchParams } from "../common/utils/set-search-params.js";
import { getOperationListID } from "./get-operation-list-id";

export const getOperations: GetOperations = ({
  from,
  replace = false,
  updateSearchParams = true,
  state,
  to,
}) => {
  if (updateSearchParams) {
    setSearchParams({ data: { from, to }, replace, router: state.router });
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
    onRejected: (_input) => {},
    onSettled: () => {},
  });

  const operationListID = getOperationListID({ from, to });

  state.promises[operationListID] = trackedPromise;

  trackedPromise.run({ from, to });

  return operationListID;
};
