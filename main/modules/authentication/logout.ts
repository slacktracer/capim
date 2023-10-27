import { navigateTo } from "#app";

import { core } from "../../core/core.js";

export const logout = async () => {
  navigateTo("/login");

  core.mainEventBus.emit("reset-all");

  await core.logout();
};
