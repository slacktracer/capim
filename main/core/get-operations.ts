import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { DatetimeRangeRecord } from "./types/DatetimeRangeRecord.js";
import type { Operation } from "./types/Operation.js";
import { setSearchParamsOnURL } from "./utils/set-search-params-on-url.js";

export const getOperations = async ({
  from,
  to,
}: DatetimeRangeRecord = {}): Promise<Operation[]> => {
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
