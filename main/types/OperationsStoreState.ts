import type { Raw } from "vue";
import type { Router } from "vue-router";

import type { useTrackedPromise } from "../composables/use-tracked-promise";
import type { Operation } from "../core/types/Operation.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type OperationsStoreState = {
  datetimeRange: [string, string];
  operations: AsyncDataState<Operation[]>;
  operationsByDate: [string, Operation[]][];
  promises: Record<
    string,
    Omit<ReturnType<typeof useTrackedPromise>, "run"> & {
      run: (input: any) => void;
    }
  >;
  router: Raw<Router>;
};
