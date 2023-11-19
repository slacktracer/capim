import { getLastListItem } from "./get-last-list-item";
import { goToListItem } from "./go-to-list-item";

export const goToLastListItem = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}) => {
  const lastListItem = getLastListItem({ listbox });

  if (lastListItem) {
    goToListItem({ listItem: lastListItem });
  }
};
