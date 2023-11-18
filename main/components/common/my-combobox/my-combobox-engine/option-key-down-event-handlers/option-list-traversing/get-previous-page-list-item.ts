import { getFirstListItem } from "./get-first-list-item.js";

export const getPreviousPageListItem = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const listboxHeight = listbox.offsetHeight;

    let accumulatedHeight = 0;
    let currentListItem;
    let previousListItem: HTMLLIElement | null;

    let safetyCounter = 0;

    currentListItem = listbox.querySelector(".aria-selected");

    while (safetyCounter < 100) {
      if (currentListItem instanceof HTMLLIElement) {
        previousListItem =
          currentListItem.previousElementSibling as HTMLLIElement;

        if (previousListItem instanceof HTMLLIElement) {
          accumulatedHeight += previousListItem.offsetHeight;

          if (accumulatedHeight > listboxHeight) {
            return currentListItem;
          }

          currentListItem = previousListItem;
        } else {
          return getFirstListItem({ listbox });
        }
      }

      safetyCounter += 1;
    }
  }
};
