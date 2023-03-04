import type { TagKey, TagValue } from "../../../core/main.js";
import type { TagsStoreState } from "../../../types/TagsStoreState.js";
import { getInitialAsyncDataState } from "../../utils/get-initial-async-data-state.js";

export const getInitialTagsStoreState = (): TagsStoreState => ({
  tags: getInitialAsyncDataState<{ keys: TagKey[]; values: TagValue[] }>({
    dataShape: { keys: [], values: [] },
  }),
});
