export type MakeTrackedAsyncFunction = <Input, Output>(input: {
  asyncFunction: (input: Input) => Promise<Output>;
  state: {
    data?: Output;
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
}) => (input: Input) => void;
