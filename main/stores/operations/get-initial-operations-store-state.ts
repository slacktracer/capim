import { OperationStoreState } from "../../types/OperationsStoreState.js";

export const getInitialOperationsStoreState = (): OperationStoreState => ({
  operations: {
    data: [],
    error: false,
    loading: false,
    ready: false,
    retrievedAt: undefined,
  },
});
