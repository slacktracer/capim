import type { EditableOperation } from "../types/EditableOperation";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import { patch } from "./http/patch.js";
import type { Operation } from "./types/Operation.js";

export const patchOperation = async ({
  editableOperation,
}: {
  editableOperation: EditableOperation;
}): Promise<Operation> | never => {
  try {
    const { operationID } = editableOperation;

    const response = await patch(`operations/${operationID}`, {
      json: editableOperation,
    }).json<Operation>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    throw error;
  }
};
