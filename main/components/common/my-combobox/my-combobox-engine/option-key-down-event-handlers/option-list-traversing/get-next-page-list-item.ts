import { getLastListItem } from "./get-last-list-item.js";

export const getNextPageListItem = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const listboxHeight = listbox.offsetHeight;

    let accumulatedHeight = 0;
    let currentListItem;
    let nextListItem: HTMLLIElement | null;

    let safetyCounter = 0;

    currentListItem = listbox.querySelector(".aria-selected");

    while (safetyCounter < 100) {
      if (currentListItem instanceof HTMLLIElement) {
        nextListItem = currentListItem.nextElementSibling as HTMLLIElement;

        if (nextListItem instanceof HTMLLIElement) {
          accumulatedHeight += nextListItem.offsetHeight;

          if (accumulatedHeight > listboxHeight) {
            return currentListItem;
          }

          currentListItem = nextListItem;
        } else {
          return getLastListItem({ listbox });
        }
      }

      safetyCounter += 1;
    }
  }
};
