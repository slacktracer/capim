import { getLastListItem } from "./get-last-list-item.js";
import { getNextListItem } from "./get-next-list-item.js";

export const getNextPageListItem = ({
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
    nextListItem = getNextListItem({ element: currentListItem });

    if (nextListItem) {
      accumulatedHeight += nextListItem.offsetHeight;

      if (accumulatedHeight > containerHeight) {
        return previousListItem;
      }

      previousListItem = currentListItem;

      currentListItem = nextListItem;
    } else {
      return getLastListItem({ container });
    }

    safetyCounter += 1;
  }
};
