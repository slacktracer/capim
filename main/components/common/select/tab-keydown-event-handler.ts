export const tabKeydownEventHandler = ({ event }: { event: Event }) => {
  event.preventDefault();
  event.stopPropagation();

  if (event.target) {
    const toggle = document.querySelector(".toggle") as HTMLElement;

    if (toggle) {
      toggle.click();
      toggle.focus();
    }
  }
};
