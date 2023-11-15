export const getNextListItem = ({
  element,
}: {
  element: HTMLElement;
}): HTMLElement | undefined => {
  const nextSibling = element.closest("li")?.nextSibling as HTMLElement;

  if (nextSibling?.tagName !== "LI") {
    return;
  }

  return nextSibling;
};
