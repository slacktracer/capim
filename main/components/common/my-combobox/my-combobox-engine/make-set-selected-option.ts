import type { EmitOptionSetEvent } from "./types/EmitOptionSetEvent";

export const makeSetSelectedOption =
  ({
    comboboxContainer,
    emitOptionSetEvent,
    toggleCombobox,
  }: {
    comboboxContainer: HTMLElement;
    emitOptionSetEvent: EmitOptionSetEvent;
    toggleCombobox: () => void;
  }) =>
  () => {
    const [combobox, listbox] = comboboxContainer.children;

    if (listbox instanceof HTMLUListElement) {
      const currentListItem = listbox.querySelector(".aria-selected");

      if (currentListItem instanceof HTMLLIElement) {
        const {
          dataset: { label, value },
        } = currentListItem;

        if (typeof label === "string" && typeof value === "string") {
          emitOptionSetEvent({
            label,
            value,
          });

          const comboboxAriaExpanded = combobox.ariaExpanded === "true";

          if (comboboxAriaExpanded) {
            toggleCombobox();
          }
        }
      }
    }
  };
