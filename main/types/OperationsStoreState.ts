import type { Raw } from "vue";
import type { Router } from "vue-router";

import type { core } from "../core/core.js";
import type { Operation } from "../core/types/Operation.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type OperationsStoreState = {
  datetimeRange: [string, string];
  operation: AsyncDataState<Operation>;
  operations: AsyncDataState<Operation[]>;
  operationsByDate: [string, Operation[]][];
  router: Raw<Router>;
  runningAsyncFunctions: Record<
    string,
    ReturnType<typeof core.makeTrackedAsyncFunctionState<Operation>>
  >;
};
