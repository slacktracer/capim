import { CoreError } from "../errors/core-error.js";
import { log } from "../log.js";

const httpError400HandlerLog = log("HTTP_ERROR_400_HANDLER");

export const httpError400Handler = async ({ response }: any) => {
  const { message } = await response.json();

  httpError400HandlerLog.warn("400 Bad Request", message);

  throw new CoreError(message, {});
};
