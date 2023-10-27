import type { TagKey } from "../../core/types/TagKey.js";
import type { TagValue } from "../../core/types/TagValue.js";
import type { TagsStoreState } from "../../types/TagsStoreState.js";
import { getInitialAsyncDataState } from "../common/utils/get-initial-async-data-state.js";

export const getInitialTagsStoreState = (): TagsStoreState => ({
  tags: getInitialAsyncDataState<{ keys: TagKey[]; values: TagValue[] }>({
    dataShape: { keys: [], values: [] },
  }),
});
