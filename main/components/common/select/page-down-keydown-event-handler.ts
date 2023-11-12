import { getNextPageListItem } from "./get-next-page-list-item.js";

export const pageDownKeydownEventHandler = ({ event }: { event: Event }) => {
  event.preventDefault();
  event.stopPropagation();

  if (event.target) {
    const nextPageListItem = getNextPageListItem({
      container: document.querySelector(".options")!,
      element: event.target as HTMLElement,
    });

    if (nextPageListItem) {
      const label = nextPageListItem.querySelector("label");

      if (label) {
        label.scrollIntoView({ block: "nearest" });
        label.focus();
        label.click();
      }
    }
  }
};
