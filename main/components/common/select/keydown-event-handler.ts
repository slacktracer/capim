import { arrowDownKeydownEventHandler } from "./arrow-down-keydown-event-handler.js";
import { arrowUpKeydownEventHandler } from "./arrow-up-keydown-event-handler.js";
import { endKeydownEventHandler } from "./end-keydown-event-handler.js";
import { homeKeydownEventHandler } from "./home-keydown-event-handler.js";
import { pageDownKeydownEventHandler } from "./page-down-keydown-event-handler.js";
import { pageUpKeydownEventHandler } from "./page-up-keydown-event-handler.js";

const keydownEventHandlers = {
  ArrowDown: arrowDownKeydownEventHandler,
  ArrowUp: arrowUpKeydownEventHandler,
  End: endKeydownEventHandler,
  Home: homeKeydownEventHandler,
  PageDown: pageDownKeydownEventHandler,
  PageUp: pageUpKeydownEventHandler,
};

export const keydownEventHandler = (event: KeyboardEvent) => {
  if (event.target && event.code) {
    keydownEventHandlers[event.code as keyof typeof keydownEventHandlers]?.({
      event,
    });
  }
};
