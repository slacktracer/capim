import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import { TagKey } from "./types/TagKey.js";
import { TagValue } from "./types/TagValue.js";

export const getTags = async (): Promise<{
  keys: TagKey[];
  values: TagValue[];
}> => {
  try {
    const [keys, values] = await Promise.all([
      get("tags/keys").json<TagKey[]>(),
      get("tags/values").json<TagValue[]>(),
    ]);

    return { keys, values };
  } catch (error: any) {
    mainRequestErrorHandler({ error });

    return { keys: [], values: [] };
  }
};
