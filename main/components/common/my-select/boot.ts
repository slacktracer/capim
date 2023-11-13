import { arrowDownKeydownEventHandler } from "./arrow-down-keydown-event-handler.js";
import { arrowUpKeydownEventHandler } from "./arrow-up-keydown-event-handler.js";
import { endKeydownEventHandler } from "./end-keydown-event-handler.js";
import { homeKeydownEventHandler } from "./home-keydown-event-handler.js";
import { pageDownKeydownEventHandler } from "./page-down-keydown-event-handler.js";
import { pageUpKeydownEventHandler } from "./page-up-keydown-event-handler.js";

export const boot = ({ mySelectElement }: { mySelectElement: HTMLElement }) => {
  mySelectElement.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement) {
      const {
        code,
        target,
        target: {
          dataset: { selectRole: role },
        },
      } = event;

      if (code && role && target) {
        roleHandlers[role as keyof typeof roleHandlers]?.({
          code,
          event,
          target,
        });
      }
    }
  });
};

export const keydownEventHandlers = {
  ArrowDown: arrowDownKeydownEventHandler,
  ArrowUp: arrowUpKeydownEventHandler,
  End: endKeydownEventHandler,
  Home: homeKeydownEventHandler,
  PageDown: pageDownKeydownEventHandler,
  PageUp: pageUpKeydownEventHandler,
};

const roleHandlers = {
  option: ({
    code,
    event,
    target,
  }: {
    code: string;
    event: KeyboardEvent;
    target: HTMLElement;
  }) => {
    event.preventDefault();

    keydownEventHandlers[code as keyof typeof keydownEventHandlers]?.({
      target,
    });
  },
};
