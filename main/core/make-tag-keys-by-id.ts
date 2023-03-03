import type { TagKey } from "./types/TagKey.js";
import type { TagKeysByID } from "./types/TagKeysByID.js";

export const makeTagKeysByID = ({
  tagKeys,
}: {
  tagKeys: TagKey[];
}): TagKeysByID => {
  const tagKeysByID = tagKeys.reduce(
    (reduction: Record<string, TagKey>, key: TagKey) => {
      reduction[key.tagKeyID] = key;

      return reduction;
    },
    {},
  );

  return tagKeysByID;
};
