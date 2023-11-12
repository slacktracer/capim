import { getLastListItem } from "./get-last-list-item.js";
import { getPreviousListItem } from "./get-previous-list-item.js";

export const arrowUpKeydownEventHandler = ({ event }: { event: Event }) => {
  event.preventDefault();
  event.stopPropagation();

  if (event.target) {
    const previousListItem = getPreviousListItem({
      element: event.target as HTMLElement,
    });

    if (previousListItem) {
      const label = previousListItem.querySelector("label");

      if (label) {
        label.scrollIntoView({ block: "nearest" });
        label.focus();
        label.click();
      }
    } else {
      const lastListItem = getLastListItem({
        container: document.querySelector(".options")!,
      });

      if (lastListItem) {
        const label = lastListItem.querySelector("label");

        if (label) {
          label.scrollIntoView({ block: "nearest" });
          label.focus();
          label.click();
        }
      }
    }
  }
};
