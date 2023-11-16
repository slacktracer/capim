import { roles } from "../../roles.js";
import { makeDebouncedClickInput } from "./make-debounced-click-input.js";

const debouncedClickInput = makeDebouncedClickInput({ delay: 50 });

export const goToListItem = ({ listItem }: { listItem: HTMLElement }) => {
  const label = listItem.querySelector(
    `[data-select-role=${roles["option-label"]}]`,
  );

  if (label instanceof HTMLLabelElement) {
    label.scrollIntoView({ block: "nearest" });

    label.focus();

    const input = label.querySelector(
      `[data-select-role=${roles["option-input"]}]`,
    );

    if (input instanceof HTMLInputElement) {
      debouncedClickInput({ input });
    }
  }
};
