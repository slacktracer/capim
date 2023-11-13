export const getFirstListItem = ({
  container,
}: {
  container: HTMLElement;
}): HTMLElement | null => container.querySelector("li:first-child");
