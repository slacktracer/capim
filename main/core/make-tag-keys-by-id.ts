import type { TagKey } from "./types/TagKey.js";

export const makeTagKeysByID = ({ tagKeys }: { tagKeys: TagKey[] }) => {
  const tagKeysByID = tagKeys.reduce(
    (reduction: Record<string, TagKey>, key: TagKey) => {
      reduction[key.tagKeyID] = key;

      return reduction;
    },
    {},
  );

  return tagKeysByID;
};
