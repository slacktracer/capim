import type { OperationStoreState } from "./OperationsStoreState.js";

export type GetOperation = (input: {
  invalidate?: boolean;
  operationID: string;
  state: OperationStoreState;
}) => void;
