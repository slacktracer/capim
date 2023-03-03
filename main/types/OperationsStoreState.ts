import type { Operation } from "../core/main.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type OperationStoreState = {
  operations: AsyncDataState<Operation[]>;
};
