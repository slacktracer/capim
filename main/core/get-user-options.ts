import { defaultUserOptions } from "./default-user-options.js";
import { storage } from "./storage.js";
import type { GetUserOptions } from "./types/GetUserOptions.js";
import { getLocalUserInfo } from "./utils/get-local-user-info.js";

export const getUserOptions: GetUserOptions = () => {
  const user = getLocalUserInfo();

  const userOptions = storage.getItem(user.userID);

  if (!userOptions) {
    return defaultUserOptions;
  }

  return JSON.parse(userOptions);
};
