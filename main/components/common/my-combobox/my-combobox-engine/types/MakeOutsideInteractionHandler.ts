import type { ToggleCombobox } from "./ToggleCombobox";

export type MakeOutsideInteractionHandler = (input: {
  comboboxContainer: HTMLElement;
  toggleCombobox: ToggleCombobox;
}) => (input: Event) => void;
