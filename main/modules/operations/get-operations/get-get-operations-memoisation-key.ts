import type { DatetimeRangeInput } from "../../../core/types/DatetimeRangeInput.js";
import type { OperationStoreState } from "../../../types/OperationsStoreState.js";

export const getGetOperationsMemoisationKey = (
  _state: OperationStoreState,
  { from, to }: DatetimeRangeInput = {},
) => `${from}::${to}`;
