import type { Operation } from "../core/main.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type OperationStoreState = {
  datetimeRange: [string, string];
  operation: AsyncDataState<Operation>;
  operations: AsyncDataState<Operation[]>;
  operationsByDate: [string, Operation[]][];
};
