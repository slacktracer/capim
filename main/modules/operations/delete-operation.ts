import { useTrackedPromise } from "../../composables/use-tracked-promise.js";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import type { DeleteOperation } from "../../types/DeleteOperation.js";

export const deleteOperation: DeleteOperation = ({
  operationID,
  onFulfilled,
  state,
}) => {
  const trackedPromise = useTrackedPromise<
    { operationID: string },
    { deletedOperation: Operation }
  >({
    action: core.promiseAction.delete,

    asyncFunction: core.deleteOperation,

    onFulfilled: ({ deletedOperation }) => {
      onFulfilled?.({ deletedOperation });
    },
  });

  state.promises[operationID] = trackedPromise;

  trackedPromise.run({ operationID });
};
