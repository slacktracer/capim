export type AsyncDataState<T> = {
  data: T;
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
