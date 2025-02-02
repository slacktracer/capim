import { keyCodes } from "./key-codes.js";
import { optionKeydownEventHandlers } from "./option-key-down-event-handlers/option-keydown-event-handlers.js";
import type { SetSelectedOption } from "./types/SetSelectedOption";

export const makeKeydownHandler =
  ({
    comboboxContainer,
    setSelectedOption,
    toggleCombobox,
  }: {
    comboboxContainer: HTMLElement;
    setSelectedOption: SetSelectedOption;
    toggleCombobox: () => void;
  }) =>
  (event: KeyboardEvent) => {
    if (event.target instanceof HTMLElement) {
      const { code, shiftKey } = event;

      const [combobox] = comboboxContainer.children;

      const comboboxAriaExpanded = combobox.ariaExpanded === "true";

      if (code === keyCodes.arrowDown && !comboboxAriaExpanded) {
        toggleCombobox();
      }

      if (code in optionKeydownEventHandlers) {
        event.preventDefault();

        const typedCode = code as keyof typeof optionKeydownEventHandlers;

        optionKeydownEventHandlers[typedCode]?.({ comboboxContainer });

        return;
      }

      if (code === keyCodes.enter) {
        event.preventDefault();

        setSelectedOption();
      }

      if (code === keyCodes.escape || code === keyCodes.tab) {
        if (!shiftKey && comboboxAriaExpanded) {
          event.preventDefault();
        }

        if (comboboxAriaExpanded) {
          toggleCombobox();
        }
      }
    }
  };
