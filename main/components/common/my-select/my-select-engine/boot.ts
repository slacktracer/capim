import { makeClickHandler } from "./make-click-handler.js";
import { makeKeydownHandler } from "./make-keydown-handler.js";
import { mouseoverHandler } from "./mouseover-handler.js";

export const boot = ({
  mySelectElement,
  onOptionSelected,
}: {
  mySelectElement: HTMLElement;
  onOptionSelected: () => void;
}): (() => void) => {
  const clickHandler = makeClickHandler({ onOptionSelected });

  mySelectElement.addEventListener("click", clickHandler);

  const keydownHandler = makeKeydownHandler({ onOptionSelected });

  mySelectElement.addEventListener("keydown", keydownHandler);

  mySelectElement.addEventListener("mouseover", mouseoverHandler);

  return function shutdown() {
    mySelectElement.removeEventListener("click", clickHandler);

    mySelectElement.removeEventListener("keydown", keydownHandler);

    mySelectElement.removeEventListener("mouseover", mouseoverHandler);
  };
};
