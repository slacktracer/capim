import type { Category } from "../core/types/Category.js";

export type CategorySelectorListItem = Pick<
  Category,
  "categoryID" | "group" | "name"
>;
