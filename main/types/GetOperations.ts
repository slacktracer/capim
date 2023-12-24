import type { OperationsStoreState } from "./OperationsStoreState.js";

export type GetOperations = (input: {
  bypassLocalCache?: boolean;
  from?: string | undefined;
  state: OperationsStoreState;
  to?: string | undefined;
}) => string;
