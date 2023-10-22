import type * as main from "../../core/main.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";

export const setDatetimeRange = ({
  from,
  to,
  state,
}: main.DatetimeRangeRecord & { state: OperationStoreState }) => {
  if (typeof from === "string") {
    state.datetimeRange[0] = from;
  }

  if (typeof to === "string") {
    state.datetimeRange[1] = to;
  }
};
