import type { OperationsStoreState } from "./OperationsStoreState.js";

export type GetOperations = (input: {
  from?: string | undefined;
  invalidate?: boolean;
  to?: string | undefined;
  state: OperationsStoreState;
}) => Promise<void>;
