import type { DatetimeRangeInput } from "../../core/types/DatetimeRangeInput.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";

export const setDatetimeRange = (
  state: OperationStoreState,
  { from, to }: DatetimeRangeInput,
) => {
  if (typeof from === "string") {
    state.datetimeRange[0] = from;
  }

  if (typeof to === "string") {
    state.datetimeRange[1] = to;
  }
};
