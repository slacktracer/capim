import * as main from "../../../core/main.js";
import type { DatetimeRangeInput } from "../../../core/types/DatetimeRangeInput.js";
import type { Operation } from "../../../core/types/Operation.js";
import type { OperationStoreState } from "../../../types/OperationsStoreState.js";
import { loadDataIntoState } from "../../common/utils/load-data-into-state.js";

export const getOperations = (
  state: OperationStoreState,
  { from, to }: DatetimeRangeInput = {},
) => {
  loadDataIntoState<Operation[]>({
    functionToCall: () => main.getOperations({ from, to }),
    stateToUpdate: state.operations,
  });
};
