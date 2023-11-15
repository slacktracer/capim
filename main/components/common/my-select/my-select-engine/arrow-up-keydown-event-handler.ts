import { getLastListItem } from "./get-last-list-item.js";
import { getPreviousListItem } from "./get-previous-list-item.js";
import { goToListItem } from "./go-to-list-item.js";

export const arrowUpKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const previousListItem = getPreviousListItem({
    element: target,
  });

  if (previousListItem) {
    goToListItem({ listItem: previousListItem });
  } else {
    const container: HTMLElement | null = target.closest(
      "[data-select-role='options']",
    );

    if (container) {
      const lastListItem = getLastListItem({ container });

      if (lastListItem) {
        goToListItem({ listItem: lastListItem });
      }
    }
  }
};
