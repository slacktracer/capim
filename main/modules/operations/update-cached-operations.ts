import { core } from "../../core/core.js";
import type { UpdateCachedOperations } from "../../types/UpdateCachedOperations";
import { isOperationList } from "./is-operation-list";

export const updateCachedOperations: UpdateCachedOperations = ({
  operationID,
  state,
}) => {
  if (state.promises[operationID]) {
    if (state.promises[operationID].action === core.promiseAction.update) {
      const promises = Object.values(state.promises);

      const values = promises.map((promise) => promise.value);

      const operationLists = values.filter((value) =>
        value && "byDate" in value ? value.byDate : false,
      );

      for (const operationList of operationLists) {
        if (isOperationList(operationList)) {
          const cachedOperation = operationList.find(
            (operation) => operation.operationID === operationID,
          );

          if (cachedOperation) {
            Object.assign(cachedOperation, state.promises[operationID].value);
          }
        }
      }
    }
  }
};
