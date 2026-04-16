import { makeClickHandler } from "./make-click-handler.js";
import { makeInputHandler } from "./make-input-handler";
import { makeKeydownHandler } from "./make-keydown-handler.js";
import { makeSetSelectedOption } from "./make-set-selected-option";
import type { EmitOptionSetEvent } from "./types/EmitOptionSetEvent";

export const boot = ({
  comboboxContainer,
  emitOptionSetEvent,
  toggleCombobox,
}: {
  comboboxContainer: HTMLElement;
  emitOptionSetEvent: EmitOptionSetEvent;
  toggleCombobox: () => void;
}) => {
  const [combobox, listbox] = comboboxContainer.children;

  if (
    combobox instanceof HTMLInputElement &&
    listbox instanceof HTMLUListElement
  ) {
    const clickHandler = makeClickHandler({
      combobox,
      listbox,
      emitOptionSetEvent,
      toggleCombobox,
    });

    comboboxContainer.addEventListener("click", clickHandler);

    const setSelectedOption = makeSetSelectedOption({
      combobox,
      listbox,
      emitOptionSetEvent,
      toggleCombobox,
    });

    const keydownHandler = makeKeydownHandler({
      combobox,
      listbox,
      setSelectedOption,
      toggleCombobox,
    });

    comboboxContainer.addEventListener("keydown", keydownHandler);

    const inputHandler = makeInputHandler({
      combobox,
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
