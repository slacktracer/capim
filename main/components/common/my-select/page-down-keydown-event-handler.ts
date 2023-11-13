import { getNextPageListItem } from "./get-next-page-list-item.js";
import { goToListItem } from "./go-to-list-item.js";

export const pageDownKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const container: HTMLElement | null = target.closest(
    "[data-select-role='options']",
  );

  if (container) {
    const nextPageListItem = getNextPageListItem({
      container,
      element: target,
    });

    if (nextPageListItem) {
      goToListItem({ listItem: nextPageListItem });
    }
  }
};
