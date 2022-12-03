import ky from "ky";

import { config } from "./config.js";
import type { Account } from "./types/Account.js";

export const getAccounts = async (): Promise<Account[]> => {
  const response = (await ky(`${config.baseURL}/accounts`, {
    credentials: "include",
    method: "GET",
  }).json()) as Account[];

  return response;
};
