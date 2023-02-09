import type { Options } from "./make-request.js";
import { makeRequest } from "./make-request.js";

export const post = (url: string, options: Options = {}) => {
  options.method = "post";

  return makeRequest(url, options);
};
