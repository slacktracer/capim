import { get } from "./http/get.js";
import type { Account } from "./types/Account.js";

export const getAccounts = async (): Promise<Account[]> => {
  const request = get("accounts");

  try {
    const response = await request.json();

    return response as Account[];
  } catch (error) {
    return [];
  }
};
