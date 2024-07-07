import type { Ref } from "vue";

import { useOperationsStore } from "../modules/operations/use-operations-store.js";
import type { EditableOperation } from "../types/EditableOperation.js";

export const useSaveOperation = ({
  copyOperation,
  editableOperation,
  newOperation,
  operationID,
}: {
  copyOperation: Ref<boolean>;
  editableOperation: EditableOperation;
  newOperation: Ref<boolean>;
  operationID: Ref<string>;
}) => {
  const operationsStore = useOperationsStore();

  // This looks like a trick but it is good for now I suppose
  let onDone: () => void = () => void undefined;

  const onFulfilled = () => {
    history.replaceState({}, "", `/operations/${operationID.value}`);

    copyOperation.value = false;

    newOperation.value = false;

    onDone();

    onDone = () => void undefined;
  };

  const saveOperation = (done?: typeof onDone) => {
    if (done) {
      onDone = done;
    }

    if (newOperation.value || copyOperation.value) {
      operationID.value = operationsStore.postOperation({
        editableOperation,

        onFulfilled,
      });

      return;
    }

    operationsStore.patchOperation({ editableOperation, onFulfilled });
  };

  return { saveOperation };
};
