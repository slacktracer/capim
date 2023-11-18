import { getFirstListItem } from "./option-list-traversing/get-first-list-item.js";
import { getNextListItem } from "./option-list-traversing/get-next-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const arrowDownKeydownEventHandler = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const currentListItem = listbox.querySelector(".aria-selected");

    if (currentListItem instanceof HTMLLIElement) {
      const nextListItem = getNextListItem({
        listItem: currentListItem,
      });

      if (nextListItem) {
        goToListItem({ listItem: nextListItem });
      } else {
        const firstListItem = getFirstListItem({ listbox });

        if (firstListItem) {
          goToListItem({ listItem: firstListItem });
        }
      }
    } else {
      const firstListItem = getFirstListItem({ listbox });

      if (firstListItem) {
        goToListItem({ listItem: firstListItem });
      }
    }
  }
};
