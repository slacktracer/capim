import { getPreviousListItem } from "./option-list-traversing/get-previous-list-item.js";
import { goToLastListItem } from "./option-list-traversing/go-to-last-list-item";
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
        goToLastListItem({ listbox });
      }
    } else {
      goToLastListItem({ listbox });
    }
  }
};
