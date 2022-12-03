import ky from "ky";

import { config } from "./config.js";
import { TagKey } from "./types/TagKey.js";
import { TagValue } from "./types/TagValue.js";

export const getTags = async (): Promise<{
  keys: TagKey[];
  values: TagValue[];
}> => {
  const [keys, values] = await Promise.all([
    ky(`${config.baseURL}/tags/keys`, {
      credentials: "include",
      method: "GET",
    }).json(),
    ky(`${config.baseURL}/tags/values`, {
      credentials: "include",
      method: "GET",
    }).json(),
  ]);

  return { keys, values } as { keys: TagKey[]; values: TagValue[] };
};
