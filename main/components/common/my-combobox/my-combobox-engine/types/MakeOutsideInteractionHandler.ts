import type { ToggleCombobox } from "../../types/ToggleCombobox";

export type MakeOutsideInteractionHandler = (input: {
  comboboxContainer: HTMLElement;
  toggleCombobox: ToggleCombobox;
}) => (input: Event) => void;
