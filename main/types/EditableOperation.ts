import type { Category } from "../core/types/Category.js";
import type { Operation } from "../core/types/Operation.js";

export type EditableOperation = Omit<Operation, "category" | "categoryID"> & {
  atDate: string;
  atTime: string;
  category: Pick<Category, "categoryID" | "group" | "name"> | undefined;
  categoryID: Pick<Category, "categoryID"> | undefined;
};
