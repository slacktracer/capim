import type { TagKey } from "./types/TagKey.js";

export const getMainTagKeysIDs = ({ tagKeys }: { tagKeys: TagKey[] }) => ({
  categoryTagKeyID: tagKeys.find((tagKey) => tagKey.name === "Category")
    ?.tagKeyID,
  groupTagKeyID: tagKeys.find((tagKey) => tagKey.name === "Group")?.tagKeyID,
});
