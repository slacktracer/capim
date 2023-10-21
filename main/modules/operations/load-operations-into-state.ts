import * as main from "../../core/main.js";
import type { DatetimeRangeRecord } from "../../core/types/DatetimeRangeRecord.js";
import type { Operation } from "../../core/types/Operation.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";

export const loadOperationsIntoState = ({
  from,
  to,
  state,
}: DatetimeRangeRecord & { state: OperationStoreState }) => {
  loadDataIntoState<Operation[]>({
    functionToCall: () => main.getOperations({ from, to }),
    stateToUpdate: state.operations,
  });
};
