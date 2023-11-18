import type { MakeOutsideInteractionHandler } from "./types/MakeOutsideInteractionHandler.js";

export const makeOutsideInteractionHandler: MakeOutsideInteractionHandler =
  ({ comboboxContainer, toggleCombobox }) =>
  (event) => {
    if (event.target instanceof HTMLElement) {
      const { target } = event;

      const containerContainsTarget = comboboxContainer.contains(target);

      if (!containerContainsTarget) {
        toggleCombobox();
      }
    }
  };
