import type { EditableOperation } from "./EditableOperation";
import type { OperationsStoreState } from "./OperationsStoreState";

export type PatchOperation = (input: {
  operation: EditableOperation;
  state: OperationsStoreState;
}) => void;
