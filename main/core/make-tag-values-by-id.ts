import type { TagValue } from "./types/TagValue.js";

export const makeTagValuesByID = ({ tagValues }: { tagValues: TagValue[] }) => {
  const tagValuesByID = tagValues.reduce(
    (reduction: Record<string, TagValue>, value: TagValue) => {
      reduction[value.tagValueID] = value;

      return reduction;
    },
    {},
  );

  return tagValuesByID;
};
