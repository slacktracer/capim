import type { OperationStoreState } from "./OperationsStoreState.js";

export type SetDatetimeRange = (input: {
  from?: string | undefined;
  to?: string | undefined;
  state: OperationStoreState;
}) => void;
