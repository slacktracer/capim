import { core } from "../../core/core.js";
import type { UpdateCachedOperations } from "../../types/UpdateCachedOperations";
import { isOperationList } from "./is-operation-list";

export const updateCachedOperations: UpdateCachedOperations = ({
  operationID,
  state,
}) => {
  if (state.promises[operationID]) {
    const promises = Object.values(state.promises);

    const values = promises.map((promise) => promise.value);

    const operationLists = values.filter((value) =>
      value && "byDate" in value ? value.byDate : false,
    );

    for (const operationList of operationLists) {
      if (isOperationList(operationList)) {
        switch (state.promises[operationID].action) {
          case core.promiseAction.delete:
            {
              const cachedOperationIndex = operationList.findIndex(
                (operation) => operation.operationID === operationID,
              );

              if (cachedOperationIndex > -1) {
                operationList.splice(cachedOperationIndex, 1);

                operationList.byDate = core.makeOperationsByDate({
                  operations: operationList,
                });
              }
            }

            break;

          case core.promiseAction.update:
            {
              const cachedOperation = operationList.find(
                (operation) => operation.operationID === operationID,
              );

              if (cachedOperation) {
                Object.assign(
                  cachedOperation,
                  state.promises[operationID].value,
                );
              }
            }

            break;

          default:
            console.warn(
              `Local cache update not implemented for promiseAction: ${String(
                state.promises[operationID].action,
              )}`,
            );
        }
      }
    }
  }
};
