import { simplifyString } from "./simplify-string";

export const simplifyAndTestStringIncludesString = (
  stringA: string,
  stringB: string,
) => simplifyString(stringA).includes(simplifyString(stringB));
