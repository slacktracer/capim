import { getNextPageListItem } from "./option-list-traversing/get-next-page-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const pageDownKeydownEventHandler = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}) => {
  const nextPageListItem = getNextPageListItem({ listbox });

  if (nextPageListItem) {
    goToListItem({ listItem: nextPageListItem });
  }
};
