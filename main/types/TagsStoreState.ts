import type { TagKey, TagValue } from "../core/main.js";
import type { AsyncDataState } from "./AsyncDataState.js";

export type TagsStoreState = {
  tags: AsyncDataState<{ keys: TagKey[]; values: TagValue[] }>;
};
