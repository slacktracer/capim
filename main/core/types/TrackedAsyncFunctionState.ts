export type TrackedAsyncFunctionState<Data> = {
  data?: Data;
  error:
    | {
        data?: Record<string, unknown>;
        message: string;
      }
    | false;
  loading: boolean;
  ready: boolean;
  retrievedAt: Date | undefined;
};
