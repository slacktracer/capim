import * as main from "../../core/main.js";
import type { GetOperationsActionInput } from "../../types/GetOperationsActionInput.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state.js";
import { memoisedGetOperations } from "./memoised-get-operations.js";

let invalidateCount = 0;

export const getOperations = ({
  from,
  invalidate,
  to,
  state,
}: GetOperationsActionInput & { state: OperationStoreState }) => {
  main.setSearchParamsOnURL({ from, to });

  if (invalidate) {
    invalidateCount += 1;
  }

  newLoadDataIntoState<main.Operation[]>({
    functionToCall: () => memoisedGetOperations({ from, to, invalidateCount }),
    stateToUpdate: state.operations,
  });
};
