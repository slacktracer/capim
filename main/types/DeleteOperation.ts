import type { Operation } from "../core/types/Operation.js";
import type { OperationsStoreState } from "./OperationsStoreState.js";

export type DeleteOperation = (input: {
  operationID: string;
  onFulfilled?: (value: { deletedOperation: Operation }) => void;
  onRejected?: (reason: unknown) => void;
  onSettled?: (settledAt: Date) => void;
  state: OperationsStoreState;
}) => void;
