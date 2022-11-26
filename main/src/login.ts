import ky from "ky";

import { config } from "./config.js";
import {storage} from "./storage.js";

export const login = async ({
  password,
  username,
}: {
  password: string;
  username: string;
}) => {
  const user = await ky(`${config.baseURL}/authentication/login`, {
    json: {
      password: password,
      username: username,
    },
    credentials: "include",
    method: "POST",
  }).json();

  storage.setItem("user", JSON.stringify(user));

  return user;
};
