import { log } from "../log.js";
import { mainEventBus } from "../main-event-bus.js";
import { abortAll } from "./abort-all.js";

const http401HandlerLog = log("HTTP_401_HANDLER");

export const http401Handler = () => {
  abortAll({ reason: "logout" });

  http401HandlerLog.warn("401 Unauthorized");

  mainEventBus.emit("logout");
};
