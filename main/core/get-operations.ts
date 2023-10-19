import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { DatetimeRangeInput } from "./types/DatetimeRangeInput.js";
import type { Operation } from "./types/Operation.js";
import { setSearchParamsOnURL } from "./utils/set-search-params-on-url.js";

export const getOperations = async ({
  from,
  to,
}: DatetimeRangeInput = {}): Promise<Operation[]> => {
  try {
    const searchParamsString = setSearchParamsOnURL({ from, to });

    const response = await get(`operations${searchParamsString}`, {
      timeout: 60000,
    }).json<Operation[]>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    return [];
  }
};
