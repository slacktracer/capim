import { makeEventBus } from "./utils/make-event-bus.js";

export const mainEventBus = makeEventBus({ description: "main-event-bus" });
