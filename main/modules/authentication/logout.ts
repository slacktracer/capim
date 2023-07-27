import { navigateTo } from "#app";

import * as main from "../../core/main.js"; // eslint-disable-line import/order

export const logout = async () => {
  navigateTo("/login");

  main.mainEventBus.emit("reset-all");

  await main.logout();
};
