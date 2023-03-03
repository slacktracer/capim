import type { Operation } from "../../core/types/Operation.js";
import type { OperationStoreState } from "../../types/OperationsStoreState.js";
import { getInitialAsyncDataState } from "../../utils/get-initial-async-data-state.js";

export const getInitialOperationsStoreState = (): OperationStoreState => ({
  operations: getInitialAsyncDataState<Operation[]>(),
});
