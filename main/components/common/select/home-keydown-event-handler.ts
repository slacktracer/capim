import { getFirstListItem } from "./get-first-list-item.js";

export const homeKeydownEventHandler = ({ event }: { event: Event }) => {
  event.preventDefault();
  event.stopPropagation();

  const firstListItem = getFirstListItem({
    container: document.querySelector(".options")!,
  });

  if (firstListItem) {
    const label = firstListItem.querySelector("label");

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
