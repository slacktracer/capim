import type { Ref } from "vue";

import { makeOutsideInteractionHandler } from "../my-combobox/my-combobox-engine/make-outside-interaction-handler.js";
import type { ToggleCombobox } from "../my-combobox/types/ToggleCombobox.js";

export const makeToggleMultiCombobox = ({
  comboboxContainer,
  showOptions,
}: {
  comboboxContainer: HTMLElement;
  showOptions: Ref<boolean>;
}): ToggleCombobox => {
  const toggleCombobox = () => {
    showOptions.value = !showOptions.value;

    if (showOptions.value) {
      window.document.body.addEventListener("click", outsideInteractionHandler);
    } else {
      window.document.body.removeEventListener(
        "click",
        outsideInteractionHandler,
      );
    }
  };

  const outsideInteractionHandler = makeOutsideInteractionHandler({
    comboboxContainer,
    toggleCombobox,
  });

  return toggleCombobox;
};
