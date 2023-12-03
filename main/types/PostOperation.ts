import type { EditableOperation } from "./EditableOperation";
import type { OperationsStoreState } from "./OperationsStoreState";

export type PostOperation = (input: {
  operation: EditableOperation;
  state: OperationsStoreState;
}) => string;
