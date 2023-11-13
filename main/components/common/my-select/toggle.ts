import type { Ref } from "vue";
import { nextTick } from "vue";

// import { handleOutsideInteraction } from "./handle-outside-interaction.js";

export const toggle = async ({
  showOptions,
}: {
  showOptions: Ref<boolean>;
}) => {
  showOptions.value = !showOptions.value;

  await nextTick();

  if (showOptions.value) {
    // window.addEventListener("click", handleOutsideInteraction);
  } else {
    // window.removeEventListener("click", handleOutsideInteraction);
  }
};
