import type { Operation } from "../../core/types/Operation.js";
import type { GetOperation } from "../../types/GetOperation.js";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state.js";
import { memoisedGetOperation } from "./memoised-get-operation.js";

let invalidateCount = 0;

export const getOperation: GetOperation = ({
  invalidate,
  operationID,
  state,
}) => {
  if (invalidate) {
    invalidateCount += 1;
  }

  newLoadDataIntoState<Operation>({
    functionToCall: () =>
      memoisedGetOperation({ invalidateCount, operationID }),
    stateToUpdate: state.operation,
  });
};
