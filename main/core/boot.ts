import { config } from "~/core/config.js";
import { getAccounts } from "~/core/get-accounts.js";
import { getTags } from "~/core/get-tags.js";
import { storage } from "~/core/storage.js";
import type { State } from "~/core/types/State.js";
import type { TagKey } from "~/core/types/TagKey.js";
import type { TagValue } from "~/core/types/TagValue.js";
import { isUserLoggedIn } from "~/core/utils/is-user-logged-in.js";

export const boot = async ({
  runtimeConfig,
}: {
  runtimeConfig: Record<string, any>;
}) => {
  Object.assign(config, runtimeConfig.public);

  const initialState: Partial<State> = {};

  const userIsLoggedIn = isUserLoggedIn();

  if (userIsLoggedIn) {
    const accounts = await getAccounts();

    const tags = await getTags();

    const tagKeysByID = tags.keys.reduce(
      (reduction: Record<string, TagKey>, key: TagKey) => {
        reduction[key.tagKeyID] = key;

        return reduction;
      },
      {},
    );

    const tagValuesByID = tags.values.reduce(
      (reduction: Record<string, TagValue>, value: TagValue) => {
        reduction[value.tagValueID] = value;

        return reduction;
      },
      {},
    );

    initialState.accounts = accounts;

    initialState.tags = tags;

    initialState.tagKeysByID = tagKeysByID;

    initialState.tagValuesByID = tagValuesByID;

    initialState.user = JSON.parse(storage.getItem("user") as string);
  }

  return initialState;
};
