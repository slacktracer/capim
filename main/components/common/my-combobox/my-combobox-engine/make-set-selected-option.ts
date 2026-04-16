import type { EmitOptionSetEvent } from "./types/EmitOptionSetEvent";

export const makeSetSelectedOption =
  ({
    combobox,
    listbox,
    emitOptionSetEvent,
    toggleCombobox,
  }: {
    combobox: HTMLInputElement;
    listbox: HTMLUListElement;
    emitOptionSetEvent: EmitOptionSetEvent;
    toggleCombobox: () => void;
  }) =>
  () => {
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
  };
