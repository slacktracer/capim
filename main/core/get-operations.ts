import ky from "ky";

import { config } from "./config.js";

export const getOperations = async () => {
  const response = await ky(`${config.baseURL}/operations`, {
    credentials: "include",
    method: "GET",
    timeout: 60000,
  }).json();

  return response;
};
