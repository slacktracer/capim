import { defineStore } from "pinia";
import { computed, reactive, readonly } from "vue";

import type { TagKey, TagValue } from "../../../core/main.js";
import * as main from "../../../core/main.js";
import { loadDataIntoState } from "../../../utils/load-data-into-state.js";
import { getInitialTagsStoreState } from "./get-initial-tags-store-state.js";

export const useTagsStore = defineStore("tags", () => {
  const state = reactive(getInitialTagsStoreState());

  const computedState = {
    tagKeysByID: computed(() =>
      main.makeTagKeysByID({ tagKeys: state.tags.data.keys || [] }),
    ),
    tagValuesByID: computed(() =>
      main.makeTagValuesByID({ tagValues: state.tags.data.values || [] }),
    ),
  };

  const getTags = () => {
    if (state.tags.ready) {
      return;
    }

    loadDataIntoState<{ keys: TagKey[]; values: TagValue[] }>({
      functionToCall: () => main.getTags(),
      stateToUpdate: state.tags,
    });
  };

  const $reset = () => void Object.assign(state, getInitialTagsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return { ...computedState, getTags, ...readonly(state), $reset };
});
