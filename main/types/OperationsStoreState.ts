import type { Raw } from "vue";
import type { Router } from "vue-router";

import type { Operation } from "../core/types/Operation.js";
import type { getInitialAsyncDataState } from "../modules/common/utils/get-initial-async-data-state";
import type { AsyncDataState } from "./AsyncDataState.js";

export type OperationsStoreState = {
  datetimeRange: [string, string];
  operation: AsyncDataState<Operation>;
  operations: AsyncDataState<Operation[]>;
  operationsByDate: [string, Operation[]][];
  router: Raw<Router>;
  running: Record<
    string,
    ReturnType<typeof getInitialAsyncDataState<Operation>>
  >;
};
