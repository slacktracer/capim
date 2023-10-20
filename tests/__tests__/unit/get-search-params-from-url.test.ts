import { describe, expect, test } from "vitest";

import { getSearchParamsFromURL } from "../../../main/core/utils/get-search-params-from-url.js";

describe("setting search params on the current URL/location", () => {
  test("it works", () => {
    // given
    window.location.href =
      "https://capim.club/operations?from=2023-08-05&to=2023-08-07";

    // when
    const result = getSearchParamsFromURL();

    // then
    expect(result).toEqual({ from: "2023-08-05", to: "2023-08-07" });
  });
});
