import { goToListItem } from "./option-key-down-event-handlers/option-list-traversing/go-to-list-item";
import { roles } from "./roles.js";
import type { EmitOptionSetEvent } from "./types/EmitOptionSetEvent";

export const makeClickHandler =
  ({
    comboboxContainer,
    emitOptionSetEvent,
    toggleCombobox,
  }: {
    comboboxContainer: HTMLElement;
    emitOptionSetEvent: EmitOptionSetEvent;
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

            if (currentListItem instanceof HTMLLIElement) {
              const {
                dataset: { label, value },
              } = currentListItem;

              if (typeof label === "string" && typeof value === "string") {
                emitOptionSetEvent({ label, value });

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
    }
  };
