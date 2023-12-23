import type { OperationsStoreState } from "./OperationsStoreState.js";

export type GetOperations = (input: {
  from?: string | undefined;
  replace?: boolean;
  updateSearchParams: boolean;
  state: OperationsStoreState;
  to?: string | undefined;
}) => string;
