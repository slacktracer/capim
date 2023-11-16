import { dismiss } from "./dismiss.js";
import { roles } from "./roles.js";

export const makeClickHandler =
  ({ onOptionSelected }: { onOptionSelected: () => void }) =>
  (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        isTrusted,
        target: {
          dataset: { selectRole: role },
        },
        target,
      } = event;

      if (role === roles["option-input"] || role === roles["option-label"]) {
        setTimeout(() => {
          onOptionSelected();
        }, 10);

        if (isTrusted) {
          dismiss({ target });
        }
      }
    }
  };
