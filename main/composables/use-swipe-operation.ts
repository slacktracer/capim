import { useSwipe } from "@vueuse/core";
import type { Ref } from "vue";

export const useSwipeOperation = ({
  operationListItem,
}: {
  operationListItem: Ref<HTMLDivElement>;
}) => {
  const { lengthX } = useSwipe(operationListItem, {
    onSwipe() {
      if (operationListItem.value) {
        const translate = operationListItem.value.dataset.translate;

        const initialTranslateValue = parseInt(translate ?? "0", 10);

        const totalTranslation = Math.round(
          -lengthX.value + initialTranslateValue,
        );

        if (totalTranslation < 1 && totalTranslation > -200) {
          operationListItem.value.style.setProperty(
            "--translate",
            `${totalTranslation}px`,
          );
        }
      }
    },

    onSwipeEnd(_event, direction) {
      if (operationListItem.value) {
        const translate = getComputedStyle(
          operationListItem.value,
        ).getPropertyValue("--translate");

        const finalTranslationInPixels = parseInt(translate, 10);

        const settleAt =
          direction === "left" && finalTranslationInPixels < -100 ? -200 : 0;

        operationListItem.value.style.setProperty(
          "--translate",
          `${settleAt}px`,
        );
      }
    },

    onSwipeStart() {
      if (operationListItem.value) {
        const translate = getComputedStyle(
          operationListItem.value,
        ).getPropertyValue("--translate");

        operationListItem.value.dataset.initialTranslateValue = translate;
      }
    },
  });
};
