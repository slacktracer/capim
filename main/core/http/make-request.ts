import ky, { type Options as KyOptions } from "ky";

import { config } from "../config.js";
import { globalRequestErrorHandler } from "./global-request-error-handler.js";
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

  const request = ky(url, options);

  request
    .catch((error) => globalRequestErrorHandler({ error, signal }))
    .finally(() => {
      delete ongoingRequestsControllers[thisRequest];
    });

  return request;
};
