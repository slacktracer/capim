import type { Options } from "./make-request.js";
import { makeRequest } from "./make-request.js";

export const patch = (url: string, options: Options = {}) => {
  options.method = "patch";

  return makeRequest(url, options);
};
