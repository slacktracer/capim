import { defineStore } from "pinia";
import { computed, reactive, readonly, toRefs } from "vue";

import type { TagKey, TagValue } from "../../core/main.js";
import * as main from "../../core/main.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";
import { getInitialTagsStoreState } from "./get-initial-tags-store-state.js";

export const useTagsStore = defineStore("tags", () => {
  const state = reactive(getInitialTagsStoreState());

  const tagKeysByID = computed(() =>
    main.makeTagKeysByID({ tagKeys: state.tags.data.keys || [] }),
  );

  const tagValuesByID = computed(() =>
    main.makeTagValuesByID({ tagValues: state.tags.data.values || [] }),
  );

  const mainTagKeysIDs = computed(() =>
    main.getMainTagKeysIDs({
      tagKeys: state.tags.data.keys || [],
    }),
  );

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

  return {
    $reset,
    ...toRefs(readonly(state)),
    mainTagKeysIDs,
    getTags,
    tagKeysByID,
    tagValuesByID,
  };
});
