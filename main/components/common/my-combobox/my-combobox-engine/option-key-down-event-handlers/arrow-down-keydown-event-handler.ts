import { getNextListItem } from "./option-list-traversing/get-next-list-item.js";
import { goToFirstListItem } from "./option-list-traversing/go-to-first-list-item";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const arrowDownKeydownEventHandler = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}) => {
  const currentListItem = listbox.querySelector(".aria-selected");

  if (currentListItem instanceof HTMLLIElement) {
    const nextListItem = getNextListItem({
      listItem: currentListItem,
    });

    if (nextListItem) {
      goToListItem({ listItem: nextListItem });
    } else {
      goToFirstListItem({ listbox });
    }
  } else {
    goToFirstListItem({ listbox });
  }
};
