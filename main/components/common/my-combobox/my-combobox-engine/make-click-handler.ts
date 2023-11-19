import { goToListItem } from "./option-key-down-event-handlers/option-list-traversing/go-to-list-item";
import { roles } from "./roles.js";

export const makeClickHandler =
  ({ toggleCombobox }: { toggleCombobox: () => void }) =>
  (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const {
        target: { role },
        target,
      } = event;

      if (role === roles.option) {
        if (target instanceof HTMLLIElement) {
          goToListItem({ listItem: target });
        }
      }

      toggleCombobox();
    }
  };
