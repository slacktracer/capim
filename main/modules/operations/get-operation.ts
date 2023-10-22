import type * as main from "../../core/main.js";
import type { GetOperationActionInput } from "../../types/GetOperationActionInput.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state.js";
import { memoisedGetOperation } from "./memoised-get-operation.js";

let invalidateCount = 0;

export const getOperation = ({
  invalidate,
  operationID,
  state,
}: GetOperationActionInput & { state: OperationStoreState }) => {
  if (invalidate) {
    invalidateCount += 1;
  }

  newLoadDataIntoState<main.Operation>({
    functionToCall: () =>
      memoisedGetOperation({ invalidateCount, operationID }),
    stateToUpdate: state.operation,
  });
};
