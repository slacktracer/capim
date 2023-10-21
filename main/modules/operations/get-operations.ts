import type { DatetimeRangeRecord } from "../../core/types/DatetimeRangeRecord.js";
import { setSearchParamsOnURL } from "../../core/utils/set-search-params-on-url.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { memoisedGetOperations } from "./memoised-get-operations.js";

export const getOperations = (
  input: DatetimeRangeRecord & { state: OperationStoreState },
) => {
  setSearchParamsOnURL({ from: input.from, to: input.to });

  return memoisedGetOperations(input);
};
