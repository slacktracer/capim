import type { GetInitialOperationsStoreState } from "../../types/GetInitialOperationsStoreState.js";

export const getInitialOperationsStoreState: GetInitialOperationsStoreState =
  () => ({
    promises: {},

    get saveAndClose() {
      return Boolean(Number(window.localStorage.getItem("saveAndClose") ?? 0));
    },

    set saveAndClose(value) {
      window.localStorage.setItem("saveAndClose", String(Number(value)));
    },
  });
