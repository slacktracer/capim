import * as main from "../core/main.js";

export const loadAsyncDataIntoReactiveState = async <T>({
  functionToCall,
  functionToCallArguments,
  stateToMutate,
}: {
  functionToCall: (parameters?: any[]) => any;
  functionToCallArguments?: any[];
  stateToMutate: {
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
}) => {
  stateToMutate.ready = false;

  stateToMutate.error = false;

  stateToMutate.loading = true;

  try {
    stateToMutate.data = await functionToCall(
      ...(functionToCallArguments ?? []),
    );

    stateToMutate.ready = true;

    stateToMutate.retrievedAt = new Date();
  } catch (error: unknown) {
    if (error instanceof main.CoreError) {
      stateToMutate.error = { data: error.data, message: error.message };
    }
  } finally {
    stateToMutate.loading = false;
  }
};
