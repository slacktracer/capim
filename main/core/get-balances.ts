import ky from "ky";

import { config } from "./config.js";
import { mainEventBus } from "./main-event-bus.js";

export const getBalances = async () => {
  try {
    const response = await ky(`${config.baseURL}/balances`, {
      credentials: "include",
      method: "GET",
    }).json();

    return response;
  } catch (error: any) {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        mainEventBus.emit("logout");
      }
    }
  }

  return [];
};
