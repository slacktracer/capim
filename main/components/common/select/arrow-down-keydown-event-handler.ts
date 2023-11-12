import { getFirstListItem } from "./get-first-list-item.js";
import { getNextListItem } from "./get-next-list-item.js";

export const arrowDownKeydownEventHandler = ({ event }: { event: Event }) => {
  event.preventDefault();
  event.stopPropagation();

  if (event.target) {
    const nextListItem = getNextListItem({
      element: event.target as HTMLElement,
    });

    if (nextListItem) {
      const label = nextListItem.querySelector("label");

      if (label) {
        label.scrollIntoView({ block: "nearest" });
        label.focus();
        label.click();
      }
    } else {
      const firstListItem = getFirstListItem({
        container: document.querySelector(".options")!,
      });

      if (firstListItem) {
        const label = firstListItem.querySelector("label");

        if (label) {
          label.scrollIntoView({ block: "nearest" });
          label.focus();
          label.click();
        }
      }
    }
  }
};
