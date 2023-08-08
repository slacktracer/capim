import type { Operation } from "../core/main.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type OperationStoreState = {
  amountOfOperationsToRender: number;
  operations: AsyncDataState<Operation[]>;
  operationsByDate: [string, Operation[]][];
  operationsByDateInSegments: [string, Operation[]][];
};
