import { mainEventBus } from "../main-event-bus.js";
import { print } from "../print.js";
import { abortAll } from "./abort-all.js";

export const globalRequestErrorHandler = ({
  error,
  signal,
}: {
  error: any;
  signal: AbortSignal;
}) => {
  if (signal.aborted) {
    print.info(error);

    return;
  }

  if (error.response) {
    const { status } = error.response;

    if (status === 401) {
      abortAll({ reason: "logout" });

      mainEventBus.emit("logout");
    }
  }
};
