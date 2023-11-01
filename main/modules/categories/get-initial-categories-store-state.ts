import type { Category } from "../../core/types/Category.js";
import type { GetInitialCategoriesStoreState } from "../../types/GetInitialCategoriesStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialCategoriesStoreState: GetInitialCategoriesStoreState =
  () => ({
    categories: getInitialAsyncDataState<Category[]>(),
    category: getInitialAsyncDataState<Category>(),
  });
