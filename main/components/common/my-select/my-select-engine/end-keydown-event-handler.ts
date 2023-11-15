import { getLastListItem } from "./get-last-list-item.js";
import { goToListItem } from "./go-to-list-item.js";

export const endKeydownEventHandler = ({ target }: { target: HTMLElement }) => {
  const container: HTMLElement | null = target.closest(
    "[data-select-role='options']",
  );

  if (container) {
    const lastListItem = getLastListItem({ container });

    if (lastListItem) {
      goToListItem({ listItem: lastListItem });
    }
  }
};
