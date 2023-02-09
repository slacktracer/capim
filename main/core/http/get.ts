import type { Options } from "./make-request.js";
import { makeRequest } from "./make-request.js";

export const get = (url: string, options: Options = {}) => {
  options.method = "get";

  return makeRequest(url, options);
};
