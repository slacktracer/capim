import { arrowDownKeydownEventHandler } from "./arrow-down-keydown-event-handler.js";
import { arrowUpKeydownEventHandler } from "./arrow-up-keydown-event-handler.js";
import { dismiss } from "./dismiss.js";
import { endKeydownEventHandler } from "./end-keydown-event-handler.js";
import { homeKeydownEventHandler } from "./home-keydown-event-handler.js";
import { pageDownKeydownEventHandler } from "./page-down-keydown-event-handler.js";
import { pageUpKeydownEventHandler } from "./page-up-keydown-event-handler.js";

const roles = {
  "option-input": "option-input",
  "option-label": "option-label",
  input: "input",
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

const enterHandler = ({
  onOptionSelected,
  target,
}: {
  onOptionSelected?: (() => void) | undefined;
  target: HTMLInputElement;
}) => {
  if (onOptionSelected === undefined) return;

  const inputIsChecked = target.checked;

  if (!inputIsChecked) {
    target.click();
  }

  setTimeout(() => {
    onOptionSelected();

    dismiss({ target });

    // This was my last resort...
    // Hopefully I wil be able to "fix" it someday...
  }, 10);
};

const selectKeydownEventHandlers = {
  Enter: enterHandler,
  Escape: dismiss,
  Tab: dismiss,
};

export const boot = ({
  mySelectElement,
  onOptionSelected,
}: {
  mySelectElement: HTMLElement;
  onOptionSelected?: (() => void) | undefined;
}) => {
  mySelectElement.addEventListener("click", (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        target: {
          dataset: { selectRole: role },
        },
        target,
      } = event;

      if (role === roles["option-input"] || role === roles["option-label"]) {
        const typedTarget = target as HTMLInputElement;

        enterHandler({ onOptionSelected, target: typedTarget });
      }
    }
  });

  mySelectElement.addEventListener("mouseover", (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        target: {
          dataset: { selectRole: role },
        },
        target,
      } = event;

      if (role === roles["option-input"] || role === roles["option-label"]) {
        target.focus();
      }
    }
  });

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
            (shiftKey && role === roles["option-input"]))
        ) {
          return;
        }

        if (code === "Enter" && role === roles["option-input"]) {
          const typedTarget = target as HTMLInputElement;

          enterHandler({ onOptionSelected, target: typedTarget });

          return;
        }

        const typedTarget = target as HTMLInputElement;

        selectKeydownEventHandlers[typedCode]?.({ target: typedTarget });

        // return;
      }
    }
  });
};
