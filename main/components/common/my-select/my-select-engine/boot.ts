import { dismiss } from "./dismiss.js";
import { enterHandler } from "./enter-handler.js";
import { keyCodes } from "./key-codes.js";
import { optionKeydownEventHandlers } from "./option-key-down-event-handlers/option-keydown-event-handlers.js";
import { roles } from "./roles.js";

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

      if (
        code === keyCodes.tab &&
        (role === roles.input ||
          (!shiftKey && role === roles.search) ||
          (shiftKey && role === roles["option-input"]))
      ) {
        return;
      }

      if (code === keyCodes.escape || code === keyCodes.tab) {
        dismiss({ target });

        return;
      }

      if (code === keyCodes.enter && role === roles["option-input"]) {
        const typedTarget = target as HTMLInputElement;

        enterHandler({ onOptionSelected, target: typedTarget });

        // return;
      }
    }
  });
};
