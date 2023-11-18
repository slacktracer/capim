import { getLastListItem } from "./option-list-traversing/get-last-list-item.js";
import { getPreviousListItem } from "./option-list-traversing/get-previous-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const arrowUpKeydownEventHandler = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const currentListItem = listbox.querySelector(".aria-selected");

    if (currentListItem instanceof HTMLLIElement) {
      const previousListItem = getPreviousListItem({
        listItem: currentListItem,
      });

      if (previousListItem) {
        goToListItem({ listItem: previousListItem });
      } else {
        const lastListItem = getLastListItem({ listbox });

        if (lastListItem) {
          goToListItem({ listItem: lastListItem });
        }
      }
    } else {
      const lastListItem = getLastListItem({ listbox });

      if (lastListItem) {
        goToListItem({ listItem: lastListItem });
      }
    }
  }
};
