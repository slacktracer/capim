import * as main from "../../core/main.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state.js";
import { memoisedGetOperations } from "./memoised-get-operations.js";

export const getOperations = ({
  from,
  to,
  state,
}: main.DatetimeRangeRecord & { state: OperationStoreState }) => {
  main.setSearchParamsOnURL({ from, to });

  newLoadDataIntoState<main.Operation[]>({
    functionToCall: () => memoisedGetOperations({ from, to }),
    stateToUpdate: state.operations,
  });
};
