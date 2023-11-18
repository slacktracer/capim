export const getPreviousListItem = ({
  listItem,
}: {
  listItem: HTMLLIElement;
}): HTMLLIElement | undefined => {
  const previousListItem = listItem.previousSibling;

  if (!(previousListItem instanceof HTMLLIElement)) {
    return;
  }

  return previousListItem;
};
