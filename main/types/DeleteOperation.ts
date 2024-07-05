import type { OperationsStoreState } from "./OperationsStoreState.js";

export type DeleteOperation = (input: {
  operationID: string;
  state: OperationsStoreState;
}) => void;
