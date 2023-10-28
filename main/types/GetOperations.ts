import type { OperationStoreState } from "./OperationsStoreState.js";

export type GetOperations = (input: {
  from?: string | undefined;
  invalidate?: boolean;
  to?: string | undefined;
  state: OperationStoreState;
}) => Promise<void>;
