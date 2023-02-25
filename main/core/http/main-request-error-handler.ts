import { log } from "../log.js";
import { httpError400Handler } from "./http-error-400-handler.js";
import { httpError401Handler } from "./http-error-401-handler.js";

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
      await httpError400Handler({ response });

      return;
    }

    if (status === 401) {
      httpError401Handler();

      return;
    }

    mainRequestErrorHandlerLog.warn("unhandled HTTP error", status);
  }

  mainRequestErrorHandlerLog.warn("unhandled unknown error", error);
};
