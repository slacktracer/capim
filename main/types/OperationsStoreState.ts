import { Operation } from "../core/main.js";

export type OperationStoreState = {
  operations: {
    data: Operation[];
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
};
