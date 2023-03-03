import type { TagKey, TagValue } from "../../core/main.js";
import { getInitialAsyncDataState } from "../../utils/get-initial-async-data-state.js";

export const getInitialTagsStoreState = () => ({
  tags: getInitialAsyncDataState<{ keys: TagKey[]; values: TagValue[] }>({
    dataShape: { keys: [], values: [] },
  }),
});
