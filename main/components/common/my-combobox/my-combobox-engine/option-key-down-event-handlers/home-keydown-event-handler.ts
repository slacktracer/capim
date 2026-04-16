import { goToFirstListItem } from "./option-list-traversing/go-to-first-list-item";

export const homeKeydownEventHandler = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}) => {
  goToFirstListItem({ listbox });
};
