import { describe, expect, test, vi } from "vitest";

import { setSearchParamsOnURL } from "../../../main/core/utils/set-search-params-on-url.js";

describe("setting search params on the current URL/location", () => {
  test("it works", () => {
    // given
    const spyOnPushState = vi.spyOn(window.history, "pushState");

    window.location.href = "https://capim.club/operations";

    const data = {
      from: "2023-08-05",
      to: "2023-08-07",
    };

    const expectedSearchParamsString = "?from=2023-08-05&to=2023-08-07";

    const expectedLocation =
      "https://capim.club/operations" + expectedSearchParamsString;

    // when
    const searchParamsString = setSearchParamsOnURL(data);

    const [[, , newHistoryEntryURL]] = spyOnPushState.mock.calls;

    // then
    expect((newHistoryEntryURL as URL).href).toBe(expectedLocation);
    expect(searchParamsString).toBe(expectedSearchParamsString);
  });
});
