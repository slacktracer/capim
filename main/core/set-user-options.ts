import { storage } from "./storage.js";
import type { SetUserOptions } from "./types/SetUserOptions.js";
import { getLocalUserInfo } from "./utils/get-local-user-info.js";

export const setUserOptions: SetUserOptions = (input) => {
  const user = getLocalUserInfo();

  storage.setItem(user.userID, JSON.stringify(input));
};
