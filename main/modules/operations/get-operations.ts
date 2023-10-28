import type { Operation } from "../../core/types/Operation.js";
import type { GetOperations } from "../../types/GetOperations.js";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state.js";
import { setSearchParams } from "../common/utils/set-search-params.js";
import { memoisedGetOperations } from "./memoised-get-operations.js";

let invalidateCount = 0;

export const getOperations: GetOperations = async ({
  from,
  invalidate,
  to,
  state,
}) => {
  await setSearchParams({ data: { from, to }, router: state.router });

  if (invalidate) {
    invalidateCount += 1;
  }

  newLoadDataIntoState<Operation[]>({
    functionToCall: () => memoisedGetOperations({ from, to, invalidateCount }),
    stateToUpdate: state.operations,
  });
};
