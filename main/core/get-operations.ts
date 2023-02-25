import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import { Operation } from "./types/Operation.js";

export const getOperations = async (): Promise<Operation[]> => {
  try {
    const response = await get(`operations`, {
      timeout: 60000,
    }).json<Operation[]>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    return [];
  }
};
