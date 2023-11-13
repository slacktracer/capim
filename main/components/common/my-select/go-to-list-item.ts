import { makeDebouncedClickInput } from "./make-debounced-click-input.js";

const debouncedClickInput = makeDebouncedClickInput({ delay: 50 });

export const goToListItem = ({ listItem }: { listItem: HTMLElement }) => {
  const label = listItem.querySelector("label");

  if (label) {
    label.scrollIntoView({ block: "nearest" });

    const input = label.querySelector("input");

    if (input) {
      input.focus();

      debouncedClickInput({ input });
    }
  }
};
