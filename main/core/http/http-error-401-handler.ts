import { log } from "../log.js";
import { mainEventBus } from "../main-event-bus.js";
import { abortAll } from "./abort-all.js";

const httpError401HandlerLog = log("HTTP_ERROR_401_HANDLER");

export const httpError401Handler = () => {
  abortAll({ reason: "logout" });

  httpError401HandlerLog.warn("401 Unauthorized");

  mainEventBus.emit("logout");
};
