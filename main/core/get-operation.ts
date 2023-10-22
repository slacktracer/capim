import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { Operation } from "./types/Operation.js";

export const getOperation = async ({
  operationID,
}: { operationID?: string } = {}): Promise<Operation> => {
  try {
    const response = await get(`operations/${operationID}`, {
      timeout: 60000,
    }).json<Operation>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    return {} as Operation;
  }
};
