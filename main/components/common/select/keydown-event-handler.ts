import { arrowDownKeydownEventHandler } from "./arrow-down-keydown-event-handler.js";
import { arrowUpKeydownEventHandler } from "./arrow-up-keydown-event-handler.js";
import { dismiss } from "./dismiss.js";
import { endKeydownEventHandler } from "./end-keydown-event-handler.js";
import { homeKeydownEventHandler } from "./home-keydown-event-handler.js";
import { pageDownKeydownEventHandler } from "./page-down-keydown-event-handler.js";
import { pageUpKeydownEventHandler } from "./page-up-keydown-event-handler.js";

export const keydownEventHandlers = {
  ArrowDown: arrowDownKeydownEventHandler,
  ArrowUp: arrowUpKeydownEventHandler,
  End: endKeydownEventHandler,
  Enter: dismiss,
  Escape: dismiss,
  Home: homeKeydownEventHandler,
  PageDown: pageDownKeydownEventHandler,
  PageUp: pageUpKeydownEventHandler,
  Tab: dismiss,
};
