import { lightFormat, startOfYear } from "date-fns/fp";

import type * as main from "../../core/main.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialOperationsStoreState = (): OperationStoreState => ({
  datetimeRange: [lightFormat("yyyy-MM-dd", startOfYear(new Date())), ""],
  operations: getInitialAsyncDataState<main.Operation[]>(),
  operationsByDate: [],
});
