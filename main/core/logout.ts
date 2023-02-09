import { post } from "./http/post.js";
import { storage } from "./storage.js";
import { deleteCookie } from "./utils/delete-cookie.js";

export const logout = () => {
  deleteCookie({ name: "secret" });

  storage.removeItem("user");

  post(`authentication/logout`);
};
