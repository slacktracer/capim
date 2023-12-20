import type { OperationsStoreState } from "./OperationsStoreState.js";

export type GetOperations = (input: {
  from?: string | undefined;
  invalidate?: boolean;
  replace?: boolean;
  to?: string | undefined;
  state: OperationsStoreState;
}) => Promise<void>;
