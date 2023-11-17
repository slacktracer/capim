import { roles } from "../roles.js";
import { getNextPageListItem } from "./option-list-traversing/get-next-page-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const pageDownKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const container: HTMLElement | null = target.closest(
    `[data-select-role=${roles.listbox}]`,
  );

  if (container) {
    const nextPageListItem = getNextPageListItem({
      container,
      element: target,
    });

    if (nextPageListItem) {
      goToListItem({ listItem: nextPageListItem });
    }
  }
};
