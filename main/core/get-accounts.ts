import ky from "ky";

import { config } from "./config.js";

export const getAccounts = async () => {
  const response = await ky(`${config.baseURL}/accounts`, {
    credentials: "include",
    method: "GET",
  }).json();

  return response;
};
