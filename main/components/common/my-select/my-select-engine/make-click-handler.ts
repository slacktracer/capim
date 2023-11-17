import { dismiss } from "./dismiss.js";
import { roles } from "./roles.js";
import type { OnOptionSelected } from "./types/OnOptionSelected.js";

export const makeClickHandler =
  ({ onOptionSelected }: { onOptionSelected: OnOptionSelected }) =>
  (event: MouseEvent) => {
    event.stopPropagation();

    if (event.target instanceof HTMLElement) {
      const {
        isTrusted,
        target: {
          dataset: { selectRole: role },
        },
        target,
      } = event;

      if (role === roles["option-input"]) {
        if (target instanceof HTMLInputElement) {
          onOptionSelected({ selectedOption: target.value });
        }

        if (isTrusted) {
          dismiss({ target });
        }
      }
    }
  };
