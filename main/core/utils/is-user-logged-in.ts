import { storage } from "~/core/storage.js";
import { getCookies } from "~/core/utils/get-cookies.js";

export const isUserLoggedIn = (): boolean => {
  const cookies = getCookies();

  const rawUser = storage.getItem("user");

  return cookies.secret.length === 36 && rawUser !== null;
};
