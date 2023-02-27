import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { Balance } from "./types/Balance.js";

export const getBalances = async (): Promise<Balance[]> => {
  try {
    const response = await get("balances").json<Balance[]>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    return [];
  }
};
