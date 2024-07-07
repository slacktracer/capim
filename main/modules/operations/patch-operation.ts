import { useTrackedPromise } from "../../composables/use-tracked-promise";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation";
import type { EditableOperation } from "../../types/EditableOperation";
import type { PatchOperation } from "../../types/PatchOperation";

export const patchOperation: PatchOperation = ({
  editableOperation,
  onFulfilled,
  state,
}) => {
  const { operationID } = editableOperation;

  const trackedPromise = useTrackedPromise<
    { editableOperation: EditableOperation },
    Operation
  >({
    action: core.promiseAction.update,

    asyncFunction: core.patchOperation,

    onFulfilled: (value) => {
      Object.assign(editableOperation, value);

      onFulfilled?.(value);
    },
  });

  state.promises[operationID] = trackedPromise;

  trackedPromise.run({ editableOperation });
};
