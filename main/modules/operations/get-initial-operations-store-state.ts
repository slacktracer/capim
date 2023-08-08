import type { Operation } from "../../core/types/Operation.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialOperationsStoreState = (): OperationStoreState => ({
  amountOfOperationsToRender: 90,
  operations: getInitialAsyncDataState<Operation[]>(),
  operationsByDate: [],
  operationsByDateInSegments: [],
});
