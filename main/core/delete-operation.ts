import { del } from "./http/delete.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { Operation } from "./types/Operation.js";

export const deleteOperation = async ({
  operationID,
}: { operationID?: string } = {}):
  | Promise<{ deletedOperation: Operation }>
  | never => {
  try {
    const response = await del(`operations/${operationID}`).json<{
      deletedOperation: Operation;
    }>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    throw error;
  }
};
