import type { OperationsStoreState } from "./OperationsStoreState.js";

export type SetDatetimeRange = (input: {
  from?: string | undefined;
  to?: string | undefined;
  state: OperationsStoreState;
}) => void;
