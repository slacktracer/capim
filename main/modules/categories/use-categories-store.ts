import { defineStore } from "pinia";
import { reactive, readonly, toRefs } from "vue";

import { core } from "../../core/core.js";
import type { CategoriesStoreState } from "../../types/CategoriesStoreState.js";
import { injectState } from "../common/utils/inject-state.js";
import { getCategories } from "./get-categories.js";
import { getInitialCategoriesStoreState } from "./get-initial-categories-store-state.js";

export const useCategoriesStore = defineStore("categories", () => {
  const state: CategoriesStoreState = reactive(
    getInitialCategoriesStoreState(),
  );

  const actions = {
    getCategories: injectState(getCategories, state),
  };

  const $reset = () =>
    void Object.assign(state, getInitialCategoriesStoreState());

  core.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...actions,
    ...toRefs(readonly(state)),
  };
});
