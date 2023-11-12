import { getPreviousPageListItem } from "./get-previous-page-list-item.js";

export const pageUpKeydownEventHandler = ({ event }: { event: Event }) => {
  event.preventDefault();
  event.stopPropagation();

  if (event.target) {
    const previousPageListItem = getPreviousPageListItem({
      container: document.querySelector(".options")!,
      element: event.target as HTMLElement,
    });

    if (previousPageListItem) {
      const label = previousPageListItem.querySelector("label");

      if (label) {
        label.scrollIntoView({ block: "nearest" });
        label.focus();

        const input = label.querySelector("input");

        if (input) {
          input.click();
        }
      }
    }
  }
};
