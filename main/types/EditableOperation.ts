import type { Operation } from "../core/types/Operation.js";

export type EditableOperation = Operation & {
  atDate: string;
  atTime: string;
};
