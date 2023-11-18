import { keyCodes } from "./key-codes.js";
import { optionKeydownEventHandlers } from "./option-key-down-event-handlers/option-keydown-event-handlers.js";

export const makeKeydownHandler =
  ({
    comboboxContainer,
    toggleCombobox,
  }: {
    comboboxContainer: HTMLElement;
    toggleCombobox: () => void;
  }) =>
  (event: KeyboardEvent) => {
    if (event.target instanceof HTMLElement) {
      const { code, shiftKey } = event;

      if (code in optionKeydownEventHandlers) {
        event.preventDefault();

        const typedCode = code as keyof typeof optionKeydownEventHandlers;

        optionKeydownEventHandlers[typedCode]?.({ comboboxContainer });

        return;
      }

      if (
        code === keyCodes.enter ||
        code === keyCodes.escape ||
        code === keyCodes.tab
      ) {
        const [combobox] = comboboxContainer.children;

        const comboboxAriaExpanded = combobox.ariaExpanded === "true";

        if (!shiftKey && comboboxAriaExpanded) {
          event.preventDefault();
        }

        if (comboboxAriaExpanded) {
          toggleCombobox();
        }
      }
    }
  };
