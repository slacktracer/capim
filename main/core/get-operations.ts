import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { Operation } from "./types/Operation.js";

export const getOperations = async ({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<Operation[]> => {
  try {
    const queryString = new URLSearchParams({ from, to }).toString();

    const response = await get(`operations?${queryString}`, {
      timeout: 60000,
    }).json<Operation[]>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    return [];
  }
};
