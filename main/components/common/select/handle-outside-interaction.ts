export const handleOutsideInteraction = (event: Event) => {
  if (event.target) {
    const target = event.target as HTMLElement;

    const selectContainsTarget = document
      .querySelector(".select")
      ?.contains(target);

    if (!selectContainsTarget) {
      const toggle = document.querySelector(".toggle") as HTMLElement;

      if (toggle && event.target !== toggle) {
        toggle.click();

        target.focus();
      }
    }
  }
};
