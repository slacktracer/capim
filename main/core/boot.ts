import { getAccounts } from "./get-accounts.js";
import { getTags } from "./get-tags.js";
import { storage } from "./storage.js";
import type { Account } from "./types/Account.js";
import type { State } from "./types/State.js";
import type { TagKey } from "./types/TagKey.js";
import type { TagValue } from "./types/TagValue.js";
import { isUserLoggedIn } from "./utils/is-user-logged-in.js";

export const boot = async (): Promise<Partial<State> | false> => {
  const userIsLoggedIn = isUserLoggedIn();

  if (userIsLoggedIn) {
    const initialState: Partial<State> = {};

    const accounts = await getAccounts();

    const accountsByID = accounts.reduce(
      (reduction: Record<string, Account>, key: Account) => {
        reduction[key.accountID] = key;

        return reduction;
      },
      {},
    );

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

    initialState.accountsByID = accountsByID;

    initialState.tags = tags;

    initialState.tagKeysByID = tagKeysByID;

    initialState.tagValuesByID = tagValuesByID;

    initialState.user = JSON.parse(storage.getItem("user") as string);

    return initialState;
  }

  return false;
};
