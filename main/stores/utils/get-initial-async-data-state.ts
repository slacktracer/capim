import type { GetInitialAsyncDataState } from "../../types/GetInitialAsyncDataState.js";

export const getInitialAsyncDataState: GetInitialAsyncDataState = <T>(
  { dataShape } = { dataShape: <T>[] },
) => ({
  data: dataShape,
  error: false,
  loading: false,
  ready: false,
  retrievedAt: undefined,
});
