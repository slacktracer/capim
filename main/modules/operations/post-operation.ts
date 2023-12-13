import { useTrackedPromise } from "../../composables/use-tracked-promise";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation";
import type { EditableOperation } from "../../types/EditableOperation";
import type { PostOperation } from "../../types/PostOperation";

export const postOperation: PostOperation = ({
  editableOperation,
  onFulfilled,
  state,
}) => {
  const operationID = core.makeUUID();

  editableOperation.operationID = operationID;

  const trackedPromise = useTrackedPromise<
    { editableOperation: EditableOperation },
    Operation
  >({
    action: core.promiseAction.create,

    asyncFunction: core.postOperation,

    onFulfilled: (value) => {
      Object.assign(editableOperation, value);

      onFulfilled?.(value);
    },

    onRejected: (_reason) => {},

    onSettled: () => {},
  });

  state.promises[operationID] = trackedPromise;

  trackedPromise.run({ editableOperation });

  return operationID;
};
