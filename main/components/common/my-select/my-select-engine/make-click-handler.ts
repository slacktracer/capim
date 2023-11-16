import { dismiss } from "./dismiss.js";
import { roles } from "./roles.js";
import type { OnOptionSelected } from "./types/OnOptionSelected.js";

export const makeClickHandler =
  ({ onOptionSelected }: { onOptionSelected: OnOptionSelected }) =>
  (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        isTrusted,
        target: {
          dataset: { selectRole: role },
        },
        target,
      } = event;

      if (role === roles["option-label"]) {
        const input = target.querySelector(
          `[data-select-role=${roles["option-input"]}]`,
        );

        if (input) {
          const typedInput = input as HTMLInputElement;

          onOptionSelected({ selectedOption: typedInput.value });
        }

        if (isTrusted) {
          dismiss({ target });
        }
      }
    }
  };
