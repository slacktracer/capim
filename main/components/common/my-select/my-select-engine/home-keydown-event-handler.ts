import { getFirstListItem } from "./get-first-list-item.js";
import { goToListItem } from "./go-to-list-item.js";

export const homeKeydownEventHandler = ({
  target,
}: {
  target: HTMLElement;
}) => {
  const container: HTMLElement | null = target.closest(
    "[data-select-role='options']",
  );

  if (container) {
    const firstListItem = getFirstListItem({ container });

    if (firstListItem) {
      goToListItem({ listItem: firstListItem });
    }
  }
};
