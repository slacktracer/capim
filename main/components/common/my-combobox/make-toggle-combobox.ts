import { unref } from "vue";

import { makeOutsideInteractionHandler } from "./my-combobox-engine/make-outside-interaction-handler";
import { goToListItem } from "./my-combobox-engine/option-key-down-event-handlers/option-list-traversing/go-to-list-item";
import type { MakeOutsideInteractionHandler } from "./my-combobox-engine/types/MakeOutsideInteractionHandler";
import type { MakeToggleCombobox } from "./types/MakeToggleCombobox";

export const makeToggleCombobox: MakeToggleCombobox = ({
  comboboxContainer,
  currentSelectedOption,
  label,
  name,
  search,
  showOptions,
  value,
}) => {
  const toggleCombobox = () => {
    showOptions.value = !showOptions.value;

    // unref-ing refs to props
    const currentSelectedOptionCurrentValue = unref(currentSelectedOption);
    const labelCurrentValue = unref(label);
    const nameCurrentValue = unref(name);
    const valueCurrentValue = unref(value);

    if (showOptions.value) {
      window.document.body.addEventListener("click", outsideInteractionHandler);

      if (currentSelectedOptionCurrentValue && valueCurrentValue) {
        const listItem = comboboxContainer.querySelector(
          `#${nameCurrentValue}-${currentSelectedOptionCurrentValue[valueCurrentValue]}`,
        );

        if (listItem instanceof HTMLLIElement) {
          goToListItem({ listItem });
        }
      }
    } else {
      window.document.body.removeEventListener(
        "click",
        outsideInteractionHandler,
      );

      if (currentSelectedOptionCurrentValue) {
        search.value = currentSelectedOptionCurrentValue[labelCurrentValue];
      }
    }
  };

  const outsideInteractionHandler: ReturnType<MakeOutsideInteractionHandler> =
    makeOutsideInteractionHandler({
      comboboxContainer,
      toggleCombobox,
    });

  return toggleCombobox;
};
