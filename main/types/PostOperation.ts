import type { Operation } from "../core/types/Operation";
import type { EditableOperation } from "./EditableOperation";
import type { OperationsStoreState } from "./OperationsStoreState";

export type PostOperation = (input: {
  onFulfilled?: (value: Operation) => void;
  onRejected?: (reason: unknown) => void;
  onSettled?: (settledAt: Date) => void;
  operation: EditableOperation;
  state: OperationsStoreState;
}) => string;
