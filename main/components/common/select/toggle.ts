import type { Instance } from "@popperjs/core";
import { createPopper } from "@popperjs/core";
import type { Ref } from "vue";
import { nextTick } from "vue";

import { handleOutsideInteraction } from "./handle-outside-interaction.js";

let popperInstance: Instance;

export const toggle = async ({
  showOptions,
}: {
  showOptions: Ref<boolean>;
}) => {
  showOptions.value = !showOptions.value;

  await nextTick();

  if (showOptions.value) {
    window.addEventListener("click", handleOutsideInteraction);

    popperInstance = createPopper(
      document.querySelector(".toggle")!,
      document.querySelector(".select")!,
      {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      },
    );

    await popperInstance.update();
  } else {
    window.removeEventListener("click", handleOutsideInteraction);

    if (popperInstance) {
      popperInstance.destroy();
    }
  }
};
