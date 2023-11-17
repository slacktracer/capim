import { dismiss } from "./dismiss.js";
import { keyCodes } from "./key-codes.js";
import { optionKeydownEventHandlers } from "./option-key-down-event-handlers/option-keydown-event-handlers.js";
import { roles } from "./roles.js";
import type { OnOptionSelected } from "./types/OnOptionSelected.js";

export const makeKeydownHandler =
  ({
    filterable,
    onOptionSelected,
  }: {
    filterable: boolean;
    onOptionSelected: OnOptionSelected;
  }) =>
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

      if (code === keyCodes.tab && shiftKey && filterable) {
        return;
      }

      if (code === keyCodes.escape || code === keyCodes.tab) {
        dismiss({ target });

        const container = target.closest(`[data-select-role=${roles.select}]`);

        if (container) {
          const toggle = container.querySelector(
            `[data-select-role=${roles.input}]`,
          );

          if (toggle instanceof HTMLElement) {
            event.preventDefault();

            toggle.focus();
          }
        }

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
