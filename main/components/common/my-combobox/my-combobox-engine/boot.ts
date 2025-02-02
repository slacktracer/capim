import { makeClickHandler } from "./make-click-handler.js";
import { makeInputHandler } from "./make-input-handler";
import { makeKeydownHandler } from "./make-keydown-handler.js";
import type { OnOptionSelected } from "./types/OnOptionSelected.js";

export const boot = ({
  comboboxContainer,
  onOptionSelected,
  toggleCombobox,
}: {
  comboboxContainer: HTMLElement;
  onOptionSelected: OnOptionSelected;
  toggleCombobox: () => void;
}) => {
  const [combobox, listbox] = comboboxContainer.children;

  if (
    combobox instanceof HTMLInputElement &&
    listbox instanceof HTMLUListElement
  ) {
    const clickHandler = makeClickHandler({
      comboboxContainer,
      onOptionSelected,
      toggleCombobox,
    });

    comboboxContainer.addEventListener("click", clickHandler);

    const keydownHandler = makeKeydownHandler({
      comboboxContainer,
      onOptionSelected,
      toggleCombobox,
    });

    comboboxContainer.addEventListener("keydown", keydownHandler);

    const inputHandler = makeInputHandler({
      comboboxContainer,
      toggleCombobox,
    });

    combobox.addEventListener("input", inputHandler);

    return function shutdown() {
      comboboxContainer.removeEventListener("click", clickHandler);

      comboboxContainer.removeEventListener("keydown", keydownHandler);

      combobox.removeEventListener("input", inputHandler);
    };
  }
};
