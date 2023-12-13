import { useTrackedPromise } from "../../composables/use-tracked-promise";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation";
import type { EditableOperation } from "../../types/EditableOperation";
import type { PatchOperation } from "../../types/PatchOperation";

export const patchOperation: PatchOperation = ({ operation, state }) => {
  const { operationID } = operation;

  const trackedPromise = useTrackedPromise<
    { operation: EditableOperation },
    Operation
  >({
    action: core.promiseAction.update,

    asyncFunction: core.patchOperation,

    onFulfilled: (value) => {
      Object.assign(operation, value);
    },

    onRejected: (_input) => {},

    onSettled: () => {},
  });

  state.promises[operationID] = trackedPromise;

  trackedPromise.run({ operation });
};
