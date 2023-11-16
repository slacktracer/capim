import { dismiss } from "./dismiss.js";
import { keyCodes } from "./key-codes.js";
import { optionKeydownEventHandlers } from "./option-key-down-event-handlers/option-keydown-event-handlers.js";
import { roles } from "./roles.js";
import type { OnOptionSelected } from "./types/OnOptionSelected.js";

export const makeKeydownHandler =
  ({ onOptionSelected }: { onOptionSelected: OnOptionSelected }) =>
  (event: KeyboardEvent) => {
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

      if (
        code === keyCodes.enter &&
        role === roles["option-input"] &&
        target instanceof HTMLInputElement
      ) {
        onOptionSelected({ selectedOption: target.value });

        // return;
      }
    }
  };
