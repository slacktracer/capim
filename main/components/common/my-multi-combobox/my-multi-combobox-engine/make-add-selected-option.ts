import type { EmitOptionAddEvent } from "./types/EmitOptionAddEvent.js";

export const makeAddSelectedOption =
  ({
    listbox,
    emitOptionAddEvent,
  }: {
    listbox: HTMLUListElement;
    emitOptionAddEvent: EmitOptionAddEvent;
  }) =>
  () => {
    const currentListItem = listbox.querySelector(".aria-selected");

    if (currentListItem instanceof HTMLLIElement) {
      const {
        dataset: { label, value },
      } = currentListItem;

      if (typeof label === "string" && typeof value === "string") {
        emitOptionAddEvent({ label, value });
      }
    }
  };
