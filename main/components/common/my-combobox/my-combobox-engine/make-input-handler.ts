import type { ToggleCombobox } from "../types/ToggleCombobox";

export const makeInputHandler =
  ({
    combobox,
    toggleCombobox,
  }: {
    combobox: HTMLInputElement;
    toggleCombobox: ToggleCombobox;
  }) =>
  () => {
    const comboboxAriaExpanded = combobox.ariaExpanded === "true";

    if (!comboboxAriaExpanded) {
      toggleCombobox();
    }
  };
