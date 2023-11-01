import type { CategoriesStoreState } from "./CategoriesStoreState.js";

export type GetCategories = (input: {
  invalidate?: boolean;
  state: CategoriesStoreState;
}) => void;
