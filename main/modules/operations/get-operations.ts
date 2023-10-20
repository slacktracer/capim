import type { DatetimeRangeInput } from "../../core/types/DatetimeRangeInput.js";
import { setSearchParamsOnURL } from "../../core/utils/set-search-params-on-url.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { memoisedGetOperations } from "./get-operations/memoised-get-operations.js";

export const getOperations = (
  state: OperationStoreState,
  { from, to }: DatetimeRangeInput,
) => {
  setSearchParamsOnURL({ from, to });

  return memoisedGetOperations(state, { from, to });
};
