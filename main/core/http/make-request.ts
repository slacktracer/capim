import type { Options as KyOptions } from "ky";
import ky from "ky";

import { config } from "../config.js";
import { ongoingRequestsControllers } from "./ongoing-requests-controllers.js";

export type Options = KyOptions;

export const makeRequest = (url: string, options: Options = {}) => {
  const controller = new AbortController();

  const { signal } = controller;

  const thisRequest = Symbol(url);

  ongoingRequestsControllers[thisRequest] = controller;

  options.credentials ??= "include";
  options.prefixUrl ??= config.baseURL;
  options.signal ??= signal;

  options.hooks = {
    afterResponse: [
      () => {
        delete ongoingRequestsControllers[thisRequest];
      },
    ],
  };

  const response = ky(url, options);

  return response;
};
