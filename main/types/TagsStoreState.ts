import type { TagKey } from "../core/types/TagKey.js";
import type { TagValue } from "../core/types/TagValue.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type TagsStoreState = {
  tags: AsyncDataState<{ keys: TagKey[]; values: TagValue[] }>;
};
