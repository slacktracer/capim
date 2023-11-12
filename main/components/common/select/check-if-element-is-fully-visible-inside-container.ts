//  Wait, what?! I'm not using this anywhere... How is my select working then...?
export const checkIfElementIsFullyVisibleInsideContainer = ({
  container,
  element,
}: {
  container: HTMLElement;
  element: HTMLElement;
}) => {
  const elementTop = element.offsetTop;
  const elementBottom = elementTop + element.clientHeight;

  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  return elementTop >= containerTop && elementBottom <= containerBottom;
};
