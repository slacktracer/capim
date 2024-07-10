import { format } from "date-fns";

import type { Operation } from "./types/Operation.js";
import type { OperationsByDate } from "./types/OperationsByDate";

export const makeOperationsByDate = ({
  operations,
}: {
  operations: Operation[];
}) => {
  const operationsByDate: OperationsByDate = Object.entries(
    operations.reduce(
      (operationsByDate: Record<string, Operation[]>, operation: Operation) => {
        const date = format(new Date(operation.at), "yyyy-MM-dd");

        if (operationsByDate[date] === undefined) {
          operationsByDate[date] = [];
        }

        operationsByDate[date].push(operation);

        return operationsByDate;
      },
      {},
    ),
  );

  Object.values(operationsByDate).map(([, operationList]) =>
    operationList.sort(
      (operationA, operationB) =>
        new Date(operationB.at).getTime() - new Date(operationA.at).getTime(),
    ),
  );

  return operationsByDate;
};
