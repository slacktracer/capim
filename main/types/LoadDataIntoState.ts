export type LoadDataIntoState = <T>(options: {
  functionToCall: () => Promise<T>;
  stateToUpdate: {
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
}) => void;
