import type { Raw } from "vue";
import type { Router } from "vue-router";

import type { Operation } from "../core/types/Operation";
import type { OperationsByDate } from "../core/types/OperationsByDate";
import type { TrackedPromise } from "../core/types/TrackedPromise";
import type { EditableOperation } from "./EditableOperation";

export type OperationsStoreState = {
  datetimeRange: [string, string];
  promises: Record<
    string,
    | TrackedPromise<
        { from: string | undefined; to: string | undefined },
        Operation[] & { byDate?: OperationsByDate }
      >
    | TrackedPromise<{ operationID: string }, Operation>
    | TrackedPromise<{ editableOperation: EditableOperation }, Operation>
  >;
  router: Raw<Router>;
};
