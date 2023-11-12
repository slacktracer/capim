import type { Instance } from "@popperjs/core";
import { createPopper } from "@popperjs/core";
import type { Ref } from "vue";
import { nextTick } from "vue";

let popperInstance: Instance;

export const makeToggle = ({ showOptions }: { showOptions: Ref<boolean> }) => {
  const checkIfClickedElementIsInsideTheSelectElement = async (
    event: Event,
  ) => {
    if (event.target) {
      const clickedElementIsInsideTheSelectElement = document
        .querySelector(".select")
        ?.contains(event.target as Node);

      if (!clickedElementIsInsideTheSelectElement) {
        await toggle({ force: false });
      }
    }
  };

  const toggle = async ({ force }: { force?: boolean } = {}) => {
    showOptions.value = force ?? !showOptions.value;

    await nextTick();

    if (showOptions.value) {
      window.addEventListener(
        "click",
        checkIfClickedElementIsInsideTheSelectElement,
      );

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
      window.removeEventListener(
        "click",
        checkIfClickedElementIsInsideTheSelectElement,
      );

      if (popperInstance) {
        popperInstance.destroy();
      }
    }
  };

  return toggle;
};
