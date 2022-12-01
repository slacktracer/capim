import ky from "ky";

import { config } from "./config.js";

export const getBalances = async () => {
  const response = await ky(`${config.baseURL}/balances`, {
    credentials: "include",
    method: "GET",
  }).json();

  return response;
};
