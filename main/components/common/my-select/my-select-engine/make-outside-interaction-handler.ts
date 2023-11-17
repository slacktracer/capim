import { roles } from "./roles.js";
import type { MakeOutsideInteractionHandler } from "./types/MakeOutsideInteractionHandler.js";

export const makeOutsideInteractionHandler: MakeOutsideInteractionHandler =
  ({ container }) =>
  (event) => {
    if (event.target instanceof HTMLElement) {
      const { target } = event;

      const containerContainsTarget = container.contains(target);

      if (!containerContainsTarget) {
        const toggle = container.querySelector(
          `[data-select-role=${roles.input}]`,
        );

        if (target !== toggle && toggle instanceof HTMLButtonElement) {
          toggle.click();
        }
      }
    }
  };
