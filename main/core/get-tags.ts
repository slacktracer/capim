import ky from "ky";

import { config } from "./config.js";

export const getTags = async () => {
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

  return [keys, values];
};
