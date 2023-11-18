import type { ToggleCombobox } from "./types/ToggleCombobox";

export const makeInputHandler =
  ({
    comboboxContainer,
    toggleCombobox,
  }: {
    comboboxContainer: HTMLElement;
    toggleCombobox: ToggleCombobox;
  }) =>
  () => {
    const [combobox] = comboboxContainer.children;

    const comboboxAriaExpanded = combobox.ariaExpanded === "true";

    if (!comboboxAriaExpanded) {
      toggleCombobox();
    }
  };
