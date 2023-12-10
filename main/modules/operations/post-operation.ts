import { useTrackedPromise } from "../../composables/use-tracked-promise";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation";
import type { EditableOperation } from "../../types/EditableOperation";
import type { PostOperation } from "../../types/PostOperation";

export const postOperation: PostOperation = ({ operation, state }) => {
  const operationID = core.makeUUID();

  operation.operationID = operationID;

  const trackedPromise = useTrackedPromise<
    { operation: EditableOperation },
    Operation
  >({
    asyncFunction: core.postOperation,
    onFulfilled: (_input) => {},
    onRejected: (_input) => {},
    onSettled: () => {},
  });

  state.promises[operationID] = trackedPromise;

  trackedPromise.run({ operation });

  return operationID;
};
