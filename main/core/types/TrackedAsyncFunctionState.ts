export type TrackedAsyncFunctionState<Data> = {
  data?: Data | Partial<Data> | undefined;
  error:
    | {
        data?: Record<string, unknown>;
        message: string;
      }
    | false;
  loading: boolean;
  ready: boolean;
  retrievedAt: Date | undefined;
  state: "pending" | "fulfilled" | "rejected";
};
