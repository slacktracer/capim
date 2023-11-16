import { enterHandler } from "./enter-handler.js";
import { roles } from "./roles.js";

export const makeClickHandler =
  ({ onOptionSelected }: { onOptionSelected: () => void }) =>
  (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        target: {
          dataset: { selectRole: role },
        },
        target,
      } = event;

      if (role === roles["option-input"] || role === roles["option-label"]) {
        const typedTarget = target as HTMLInputElement;

        enterHandler({ onOptionSelected, target: typedTarget });
      }
    }
  };
