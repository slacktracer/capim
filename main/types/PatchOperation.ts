import type { Operation } from "../core/types/Operation";
import type { EditableOperation } from "./EditableOperation";
import type { OperationsStoreState } from "./OperationsStoreState";

export type PatchOperation = (input: {
  editableOperation: EditableOperation;
  onFulfilled?: (value: Operation) => void;
  onRejected?: (reason: unknown) => void;
  onSettled?: (settledAt: Date) => void;
  state: OperationsStoreState;
}) => void;
