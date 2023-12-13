import type { EditableOperation } from "../types/EditableOperation";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import { post } from "./http/post.js";
import type { Operation } from "./types/Operation.js";

export const postOperation = async ({
  editableOperation,
}: {
  editableOperation: EditableOperation;
}): Promise<Operation> | never => {
  try {
    const { operationID } = editableOperation;

    const response = await post(`operations/${operationID}`, {
      json: editableOperation,
    }).json<Operation>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    throw error;
  }
};
