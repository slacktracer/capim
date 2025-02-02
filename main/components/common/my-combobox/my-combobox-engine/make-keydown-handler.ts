import { keyCodes } from "./key-codes.js";
import { optionKeydownEventHandlers } from "./option-key-down-event-handlers/option-keydown-event-handlers.js";
import type { OnOptionSelected } from "./types/OnOptionSelected";

export const makeKeydownHandler =
  ({
    comboboxContainer,
    onOptionSelected,
    toggleCombobox,
  }: {
    comboboxContainer: HTMLElement;
    onOptionSelected: OnOptionSelected;
    toggleCombobox: () => void;
  }) =>
  (event: KeyboardEvent) => {
    const setOption = makeSetOption({
      comboboxContainer,
      onOptionSelected,
      toggleCombobox,
    });

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

        setOption();
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

const makeSetOption =
  ({
    comboboxContainer,
    onOptionSelected,
    toggleCombobox,
  }: {
    comboboxContainer: HTMLElement;
    onOptionSelected: OnOptionSelected;
    toggleCombobox: () => void;
  }) =>
  () => {
    const [combobox, listbox] = comboboxContainer.children;

    if (listbox instanceof HTMLUListElement) {
      const currentListItem = listbox.querySelector(".aria-selected");

      const {
        dataset: { label, value },
      } = currentListItem;

      if (label) {
        onOptionSelected({
          label,
          value,
        });

        const comboboxAriaExpanded = combobox.ariaExpanded === "true";

        if (comboboxAriaExpanded) {
          toggleCombobox();
        }
      }
    }
  };
