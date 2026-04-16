import { getPreviousPageListItem } from "./option-list-traversing/get-previous-page-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const pageUpKeydownEventHandler = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}) => {
  const previousPageListItem = getPreviousPageListItem({ listbox });

  if (previousPageListItem) {
    goToListItem({ listItem: previousPageListItem });
  }
};
