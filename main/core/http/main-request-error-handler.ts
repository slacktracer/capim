import { log } from "../log.js";
import { http400Handler } from "./http-400-handler.js";
import { http401Handler } from "./http-401-handler.js";

const mainRequestErrorHandlerLog = log("MAIN_REQUEST_ERROR_HANDLER");

export const mainRequestErrorHandler = async ({
  error,
}: {
  error: { response: any; status: number };
}) => {
  if (error.response) {
    const { response } = error;

    const { status } = response;

    if (status === 400) {
      await http400Handler({ response });

      return;
    }

    if (status === 401) {
      http401Handler();

      return;
    }

    mainRequestErrorHandlerLog.warn("unhandled HTTP error", status);
  }

  mainRequestErrorHandlerLog.warn("unhandled unknown error", error);
};
