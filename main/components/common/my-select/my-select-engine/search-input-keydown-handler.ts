import { dismiss } from "./dismiss.js";
import { keyCodes } from "./key-codes.js";

export const searchInputKeydownHandler = (event: KeyboardEvent) => {
  if (event.target instanceof HTMLElement) {
    const { code, shiftKey, target } = event;

    if (code === keyCodes.escape) {
      dismiss({ target });
    }

    if (code === keyCodes.tab && shiftKey) {
      event.preventDefault();

      dismiss({ target });
    }
  }
};
