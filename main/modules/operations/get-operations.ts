import type { DatetimeRangeRecord } from "../../core/types/DatetimeRangeRecord.js";
import type { Operation } from "../../core/types/Operation.js";
import { setSearchParamsOnURL } from "../../core/utils/set-search-params-on-url.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state.js";
import { memoisedGetOperations } from "./memoised-get-operations.js";

export const getOperations = ({
  from,
  to,
  state,
}: DatetimeRangeRecord & { state: OperationStoreState }) => {
  setSearchParamsOnURL({ from, to });

  newLoadDataIntoState<Operation[]>({
    functionToCall: () => memoisedGetOperations({ from, to }),
    stateToUpdate: state.operations,
  });
};
