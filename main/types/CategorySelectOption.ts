import type { Category } from "../core/types/Category.js";

export type CategorySelectOption = Pick<
  Category,
  "categoryID" | "group" | "name"
>;
