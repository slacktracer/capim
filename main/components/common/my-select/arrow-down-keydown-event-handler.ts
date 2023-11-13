import { getFirstListItem } from "./get-first-list-item.js";
import { getNextListItem } from "./get-next-list-item.js";
import { goToListItem } from "./go-to-list-item.js";

export const arrowDownKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const nextListItem = getNextListItem({
    element: target,
  });

  if (nextListItem) {
    goToListItem({ listItem: nextListItem });
  } else {
    const container: HTMLElement | null = target.closest(
      "[data-select-role='options']",
    );

    if (container) {
      const firstListItem = getFirstListItem({ container });

      if (firstListItem) {
        goToListItem({ listItem: firstListItem });
      }
    }
  }
};
