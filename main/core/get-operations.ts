import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { DatetimeRangeRecord } from "./types/DatetimeRangeRecord.js";
import type { Operation } from "./types/Operation.js";
import { filterOutFalsyEntries } from "./utils/filter-out-falsy-entries.js";

export const getOperations = async ({ from, to }: DatetimeRangeRecord = {}):
  | Promise<Operation[]>
  | never => {
  const searchParams = filterOutFalsyEntries({ object: { from, to } });

  try {
    const response = await get(`operations`, {
      searchParams,
      timeout: 60000,
    }).json<Operation[]>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    throw error;
  }
};
