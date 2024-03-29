import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { Account } from "./types/Account.js";

export const getAccounts = async (): Promise<Account[]> => {
  try {
    const response = await get("accounts").json<Account[]>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    return [];
  }
};
