import type { OperationsStoreState } from "./OperationsStoreState.js";

export type GetOperation = (input: {
  bypassLocalCache?: boolean;
  operationID: string;
  state: OperationsStoreState;
}) => void;
