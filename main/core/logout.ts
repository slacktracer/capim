import ky from "ky";

import { config } from "./config.js";
import { storage } from "./storage.js";
import { deleteCookie } from "./utils/delete-cookie.js";

export const logout = async () => {
  deleteCookie({ name: "secret" });

  storage.removeItem("user");

  await ky(`${config.baseURL}/authentication/logout`, {
    credentials: "include",
    method: "POST",
  });
};
