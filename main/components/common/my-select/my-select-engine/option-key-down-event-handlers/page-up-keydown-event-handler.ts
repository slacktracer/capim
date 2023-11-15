import { getPreviousPageListItem } from "./option-list-traversing/get-previous-page-list-item.js";
import { goToListItem } from "./option-list-traversing/go-to-list-item.js";

export const pageUpKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const container: HTMLElement | null = target.closest(
    "[data-select-role='options']",
  );

  if (container) {
    const previousPageListItem = getPreviousPageListItem({
      container,
      element: target,
    });

    if (previousPageListItem) {
      goToListItem({ listItem: previousPageListItem });
    }
  }
};
