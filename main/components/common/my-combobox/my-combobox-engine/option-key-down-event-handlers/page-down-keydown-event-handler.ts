import { getNextPageListItem } from "./option-list-traversing/get-next-page-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const pageDownKeydownEventHandler = ({
  comboboxContainer,
}: {
  comboboxContainer: HTMLElement;
}) => {
  const [, listbox] = comboboxContainer.children;

  if (listbox instanceof HTMLUListElement) {
    const nextPageListItem = getNextPageListItem({
      comboboxContainer,
    });

    if (nextPageListItem) {
      goToListItem({ listItem: nextPageListItem });
    }
  }
};
