import type { OperationsStoreState } from "./OperationsStoreState";

export type UpdateCachedOperations = (input: {
  operationID: string;
  state: OperationsStoreState;
}) => void;
