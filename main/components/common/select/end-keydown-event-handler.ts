import { getLastListItem } from "./get-last-list-item.js";

export const endKeydownEventHandler = ({ event }: { event: Event }) => {
  event.preventDefault();
  event.stopPropagation();

  const lastListItem = getLastListItem({
    container: document.querySelector(".options")!,
  });

  if (lastListItem) {
    const label = lastListItem.querySelector("label");

    if (label) {
      label.scrollIntoView({ block: "nearest" });
      label.focus();

      const input = label.querySelector("input");

      if (input) {
        input.click();
      }
    }
  }
};
