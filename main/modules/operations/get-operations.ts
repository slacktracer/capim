import type { Operation } from "../../core/types/Operation.js";
import type { GetOperationsActionInput } from "../../types/GetOperationsActionInput.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state.js";
import { setSearchParams } from "../common/utils/set-search-params.js";
import { memoisedGetOperations } from "./memoised-get-operations.js";

let invalidateCount = 0;

export const getOperations = async ({
  from,
  invalidate,
  to,
  state,
}: GetOperationsActionInput & { state: OperationStoreState }) => {
  await setSearchParams({ data: { from, to }, router: state.router });

  if (invalidate) {
    invalidateCount += 1;
  }

  newLoadDataIntoState<Operation[]>({
    functionToCall: () => memoisedGetOperations({ from, to, invalidateCount }),
    stateToUpdate: state.operations,
  });
};
