import { get } from "./http/get.js";
import { TagKey } from "./types/TagKey.js";
import { TagValue } from "./types/TagValue.js";

export const getTags = async (): Promise<{
  keys: TagKey[];
  values: TagValue[];
}> => {
  try {
    const [keys, values] = await Promise.all([
      get("tags/keys").json(),
      get("tags/values").json(),
    ]);

    return { keys, values } as { keys: TagKey[]; values: TagValue[] };
  } catch (error) {
    return { keys: [], values: [] };
  }
};
