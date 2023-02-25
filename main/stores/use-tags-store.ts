import { defineStore } from "pinia";
import type { Ref } from "vue";
import { readonly, ref } from "vue";

import type { TagKey, TagValue } from "../core/main.js";
import * as main from "../core/main.js";

type TagStoreTags = {
  data: {
    keys: TagKey[];
    values: TagValue[];
  };
  error: {
    data: Record<string, unknown>;
    message: string;
  };
};

export const useTagsStore = defineStore("tags", () => {
  const tags: Ref<TagStoreTags> = ref({
    data: { keys: [], values: [] },
    error: {
      data: {},
      message: "",
    },
  });

  const tagKeysByID = ref({});

  const tagValuesByID = ref({});

  const getTags = async () => {
    try {
      tags.value.data = await main.getTags();

      tags.value.error = { data: {}, message: "" };

      tagKeysByID.value = main.makeTagKeysByID({
        tagKeys: tags.value.data.keys,
      });

      tagValuesByID.value = main.makeTagValuesByID({
        tagValues: tags.value.data.values,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        tags.value.error.message = error.message;
      }
    }
  };

  const $reset = () => {
    tags.value = {
      data: { keys: [], values: [] },
      error: {
        data: {},
        message: "",
      },
    };
    tagKeysByID.value = {};
    tagValuesByID.value = {};
  };

  main.mainEventBus.on("reset-all", $reset);

  return {
    getTags,
    tags: readonly(tags),
    tagKeysByID: readonly(tagKeysByID),
    tagValuesByID: readonly(tagValuesByID),
    $reset,
  };
});
