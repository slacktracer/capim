export const getPreviousListItem = ({ element }: { element: HTMLElement }) => {
  const previousSibling = element.closest("li")?.previousSibling as HTMLElement;

  if (previousSibling?.tagName !== "LI") {
    return;
  }

  return previousSibling;
};
