import type { Options } from "./make-request.js";
import { makeRequest } from "./make-request.js";

export const del = (url: string, options: Options = {}) => {
  options.method = "delete";

  return makeRequest(url, options);
};
