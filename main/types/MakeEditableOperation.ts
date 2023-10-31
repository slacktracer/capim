import type { Operation } from "../core/types/Operation.js";
import type { EditableOperation } from "./EditableOperation.js";

export type MakeEditableOperation = (input: {
  data: Operation;
}) => EditableOperation;
