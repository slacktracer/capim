import { makeInputHandler } from "../../my-combobox/my-combobox-engine/make-input-handler.js";
import { makeKeydownHandler } from "../../my-combobox/my-combobox-engine/make-keydown-handler.js";
import { makeAddSelectedOption } from "./make-add-selected-option.js";
import { makeClickHandler } from "./make-click-handler.js";
import type { EmitOptionAddEvent } from "./types/EmitOptionAddEvent.js";

export const boot = ({
  comboboxContainer,
  emitOptionAddEvent,
  toggleCombobox,
}: {
  comboboxContainer: HTMLElement;
  emitOptionAddEvent: EmitOptionAddEvent;
  toggleCombobox: () => void;
}) => {
  const combobox = comboboxContainer.querySelector("input");
  const listbox = comboboxContainer.querySelector("ul");

  if (
    combobox instanceof HTMLInputElement &&
    listbox instanceof HTMLUListElement
  ) {
    const clickHandler = makeClickHandler({ emitOptionAddEvent });

    comboboxContainer.addEventListener("click", clickHandler);

    const addSelectedOption = makeAddSelectedOption({
      listbox,
      emitOptionAddEvent,
    });

    const keydownHandler = makeKeydownHandler({
      combobox,
      listbox,
      setSelectedOption: addSelectedOption,
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
