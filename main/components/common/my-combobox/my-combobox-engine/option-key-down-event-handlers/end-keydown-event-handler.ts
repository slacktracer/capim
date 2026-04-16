import { goToLastListItem } from "./option-list-traversing/go-to-last-list-item";

export const endKeydownEventHandler = ({
  listbox,
}: {
  listbox: HTMLUListElement;
}) => {
  goToLastListItem({ listbox });
};
