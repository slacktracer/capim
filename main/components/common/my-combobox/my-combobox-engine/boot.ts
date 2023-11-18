import { makeClickHandler } from "./make-click-handler.js";
import { makeKeydownHandler } from "./make-keydown-handler.js";
import { startOptionSelectedObserver } from "./start-option-selected-observer";
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
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const optionSelectedObserver = startOptionSelectedObserver({
      listbox,
      onOptionSelected,
    });

    const clickHandler = makeClickHandler({ toggleCombobox });

    comboboxContainer.addEventListener("click", clickHandler);

    const keydownHandler = makeKeydownHandler({
      comboboxContainer,
      toggleCombobox,
    });

    comboboxContainer.addEventListener("keydown", keydownHandler);

    return function shutdown() {
      optionSelectedObserver.disconnect();

      comboboxContainer.removeEventListener("click", clickHandler);

      comboboxContainer.removeEventListener("keydown", keydownHandler);
    };
  }
};
