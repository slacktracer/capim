import { lightFormat, startOfYear } from "date-fns/fp";

import type { Operation } from "../../core/types/Operation.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialOperationsStoreState = (): OperationStoreState => ({
  amountOfOperationsToRender: 90,
  datetimeRange: [lightFormat("yyyy-MM-dd", startOfYear(new Date())), ""],
  operations: getInitialAsyncDataState<Operation[]>(),
  operationsByDate: [],
  operationsByDateInSegments: [],
});
