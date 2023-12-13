import type { Operation } from "./types/Operation.js";

export const makeOperationsByDate = ({
  operations,
}: {
  operations: Operation[];
}) => {
  const operationsByDate: [string, Operation[]][] = Object.entries(
    operations.reduce(
      (operationsByDate: Record<string, Operation[]>, operation: Operation) => {
        const date = operation.at.substring(0, 10);

        if (operationsByDate[date] === undefined) {
          operationsByDate[date] = [];
        }

        operationsByDate[date].push(operation);

        return operationsByDate;
      },
      {},
    ),
  );

  return operationsByDate;
};
