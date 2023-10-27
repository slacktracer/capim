import { lightFormat, startOfYear } from "date-fns/fp";
import type { Router } from "vue-router";

import type { Operation } from "../../core/types/Operation.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialOperationsStoreState = (): OperationStoreState => ({
  datetimeRange: [lightFormat("yyyy-MM-dd", startOfYear(new Date())), ""],
  operation: getInitialAsyncDataState<Operation>(),
  operations: getInitialAsyncDataState<Operation[]>(),
  operationsByDate: [],
  router: {} as Router,
});
