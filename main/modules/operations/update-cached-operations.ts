import { format } from "date-fns";

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

    if (state.promises[operationID].action === core.promiseAction.delete) {
      for (const operationList of operationLists) {
        if (isOperationList(operationList)) {
          const cachedOperationIndex = operationList.findIndex(
            (operation) => operation.operationID === operationID,
          );

          if (cachedOperationIndex > -1) {
            const [cachedOperation] = operationList.splice(
              cachedOperationIndex,
              1,
            );

            const cachedOperationDate = format(
              new Date(cachedOperation.at),
              "yyyy-MM-dd",
            );

            if (operationList.byDate) {
              const operationsOnDate = operationList.byDate.find(
                ([date]) => date === cachedOperationDate,
              );

              if (operationsOnDate) {
                const [, operations] = operationsOnDate;

                const cachedOperationIndexInByDate = operations.findIndex(
                  (operation) => operation.operationID === operationID,
                );

                operations.splice(cachedOperationIndexInByDate, 1);
              }
            }
          }
        }
      }
    }

    if (state.promises[operationID].action === core.promiseAction.update) {
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
