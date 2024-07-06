import { lightFormat, startOfMonth } from "date-fns/fp";

import type { GetInitialOperationsStoreState } from "../../types/GetInitialOperationsStoreState.js";

export const getInitialOperationsStoreState: GetInitialOperationsStoreState =
  () => ({
    datetimeRange: [lightFormat("yyyy-MM-dd", startOfMonth(new Date())), ""],

    promises: {},

    get saveAndClose() {
      return Boolean(Number(window.localStorage.getItem("saveAndClose") ?? 0));
    },

    set saveAndClose(value) {
      window.localStorage.setItem("saveAndClose", String(Number(value)));
    },
  });
