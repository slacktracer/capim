import ky from "ky";

import { config } from "./config.js";
import { storage } from "./storage.js";

export const logout = async () => {
  await ky(`${config.baseURL}/authentication/logout`, {
    credentials: "include",
    method: "POST",
  });

  storage.removeItem("user");
};
