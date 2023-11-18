import { getPreviousPageListItem } from "./option-list-traversing/get-previous-page-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const pageUpKeydownEventHandler = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const previousPageListItem = getPreviousPageListItem({
      comboboxContainer,
    });

    if (previousPageListItem) {
      goToListItem({ listItem: previousPageListItem });
    }
  }
};
