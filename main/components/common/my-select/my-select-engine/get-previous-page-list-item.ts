import { getFirstListItem } from "./get-first-list-item.js";
import { getPreviousListItem } from "./get-previous-list-item.js";

export const getPreviousPageListItem = ({
  container,
  element,
}: {
  container: HTMLElement;
  element: HTMLElement;
}) => {
  const containerHeight = container.offsetHeight;

  let accumulatedHeight = 0;
  let currentListItem = element;
  let nextListItem: HTMLElement | undefined;
  let previousListItem: HTMLElement | undefined;

  let safetyCounter = 0;

  while (safetyCounter < 100) {
    previousListItem = getPreviousListItem({ element: currentListItem });

    if (previousListItem) {
      accumulatedHeight += previousListItem.offsetHeight;

      if (accumulatedHeight > containerHeight) {
        return nextListItem;
      }

      nextListItem = currentListItem;

      currentListItem = previousListItem;
    } else {
      return getFirstListItem({ container });
    }

    safetyCounter += 1;
  }
};
