import { goToListItem } from "./option-key-down-event-handlers/option-list-traversing/go-to-list-item";
import { roles } from "./roles.js";
import type { OnOptionSelected } from "./types/OnOptionSelected";

export const makeClickHandler =
  ({
    comboboxContainer,
    onOptionSelected,
    toggleCombobox,
  }: {
    comboboxContainer: HTMLElement;
    onOptionSelected: OnOptionSelected;
    toggleCombobox: () => void;
  }) =>
  (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        target: { role },
        target,
      } = event;

      if (role === roles.option) {
        if (target instanceof HTMLLIElement) {
          goToListItem({ listItem: target, noDebounce: true });

          const [, listbox] = comboboxContainer.children;

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

              const [combobox] = comboboxContainer.children;

              const comboboxAriaExpanded = combobox.ariaExpanded === "true";

              if (comboboxAriaExpanded) {
                toggleCombobox();
              }
            }
          }
        }
      }
    }
  };
