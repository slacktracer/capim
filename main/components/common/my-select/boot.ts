import { arrowDownKeydownEventHandler } from "./arrow-down-keydown-event-handler.js";
import { arrowUpKeydownEventHandler } from "./arrow-up-keydown-event-handler.js";
import { dismiss } from "./dismiss.js";
import { endKeydownEventHandler } from "./end-keydown-event-handler.js";
import { homeKeydownEventHandler } from "./home-keydown-event-handler.js";
import { pageDownKeydownEventHandler } from "./page-down-keydown-event-handler.js";
import { pageUpKeydownEventHandler } from "./page-up-keydown-event-handler.js";

const roles = {
  input: "input",
  option: "option",
  search: "search",
  select: "select",
} as const;

const optionKeydownEventHandlers = {
  ArrowDown: arrowDownKeydownEventHandler,
  ArrowUp: arrowUpKeydownEventHandler,
  End: endKeydownEventHandler,
  Home: homeKeydownEventHandler,
  PageDown: pageDownKeydownEventHandler,
  PageUp: pageUpKeydownEventHandler,
};

const selectKeydownEventHandlers = {
  Escape: dismiss,
  Tab: dismiss,
};

export const boot = ({ mySelectElement }: { mySelectElement: HTMLElement }) => {
  mySelectElement.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        code,
        shiftKey,
        target: {
          dataset: { selectRole: role },
        },
        target,
      } = event;

      if (code in optionKeydownEventHandlers) {
        event.preventDefault();

        const typedCode = code as keyof typeof optionKeydownEventHandlers;

        optionKeydownEventHandlers[typedCode]?.({ target });

        return;
      }

      if (code in selectKeydownEventHandlers) {
        const typedCode = code as keyof typeof selectKeydownEventHandlers;

        if (
          code === "Tab" &&
          (role === roles.input ||
            (!shiftKey && role === roles.search) ||
            (shiftKey && role === roles.option))
        ) {
          return;
        }

        selectKeydownEventHandlers[typedCode]?.({ target });

        // return;
      }
    }
  });
};
