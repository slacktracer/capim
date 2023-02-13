import { CoreError } from "../errors/core-error.js";
import { mainEventBus } from "../main-event-bus.js";
import { abortAll } from "./abort-all.js";

export const mainRequestErrorHandler = async ({ error }: { error: any }) => {
  if (error.response) {
    const { status } = error.response;

    if (status === 400) {
      const { message } = await error.response.json();

      return new CoreError({ message }, "400 HTTP Error");
    }

    if (status === 401) {
      abortAll({ reason: "logout" });

      mainEventBus.emit("logout");

      const { message } = await error.response.json();

      return new CoreError({ message }, "401 HTTP Error");
    }
  }
};
