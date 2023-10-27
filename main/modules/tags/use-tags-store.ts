import { defineStore } from "pinia";
import { computed, reactive, readonly, toRefs } from "vue";

import { core } from "../../core/core.js";
import type { TagKey } from "../../core/types/TagKey.js";
import type { TagValue } from "../../core/types/TagValue.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";
import { getInitialTagsStoreState } from "./get-initial-tags-store-state.js";

export const useTagsStore = defineStore("tags", () => {
  const state = reactive(getInitialTagsStoreState());

  const tagKeysByID = computed(() =>
    core.makeTagKeysByID({ tagKeys: state.tags.data.keys || [] }),
  );

  const tagValuesByID = computed(() =>
    core.makeTagValuesByID({ tagValues: state.tags.data.values || [] }),
  );

  const mainTagKeysIDs = computed(() =>
    core.getMainTagKeysIDs({
      tagKeys: state.tags.data.keys || [],
    }),
  );

  const getTags = () => {
    if (state.tags.ready) {
      return;
    }

    loadDataIntoState<{ keys: TagKey[]; values: TagValue[] }>({
      functionToCall: () => core.getTags(),
      stateToUpdate: state.tags,
    });
  };

  const $reset = () => void Object.assign(state, getInitialTagsStoreState());

  core.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...toRefs(readonly(state)),
    mainTagKeysIDs,
    getTags,
    tagKeysByID,
    tagValuesByID,
  };
});
