import type { Category } from "../core/types/Category.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type CategoriesStoreState = {
  category: AsyncDataState<Category>;
  categories: AsyncDataState<Category[]>;
};
