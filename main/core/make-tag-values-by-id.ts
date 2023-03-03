import type { TagValue } from "./types/TagValue.js";
import type { TagValuesByID } from "./types/TagValuesByID.js";

export const makeTagValuesByID = ({
  tagValues,
}: {
  tagValues: TagValue[];
}): TagValuesByID => {
  const tagValuesByID = tagValues.reduce(
    (reduction: Record<string, TagValue>, value: TagValue) => {
      reduction[value.tagValueID] = value;

      return reduction;
    },
    {},
  );

  return tagValuesByID;
};
