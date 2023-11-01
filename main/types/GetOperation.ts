import type { OperationsStoreState } from "./OperationsStoreState.js";

export type GetOperation = (input: {
  invalidate?: boolean;
  operationID: string;
  state: OperationsStoreState;
}) => void;
