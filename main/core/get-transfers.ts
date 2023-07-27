import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { Transfer } from "./types/Transfer.js";

export const getTransfers = async (): Promise<Transfer[]> => {
  try {
    const response = await get(`transfers`, {
      timeout: 60000,
    }).json<Transfer[]>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    return [];
  }
};
