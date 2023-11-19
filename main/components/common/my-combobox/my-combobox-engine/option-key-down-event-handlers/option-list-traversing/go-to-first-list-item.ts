import { getFirstListItem } from "./get-first-list-item";
import { goToListItem } from "./go-to-list-item";

export const goToFirstListItem = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}) => {
  const firstListItem = getFirstListItem({ listbox });

  if (firstListItem) {
    goToListItem({ listItem: firstListItem });
  }
};
