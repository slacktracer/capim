import { reactive } from "vue";

import { core } from "../core/core.js";

export const useTrackedPromise = <Input, Output>({
  asyncFunction,
  onFulfilled,
  onRejected,
  onSettled,
}: {
  asyncFunction: (input: Input) => Promise<Output>;
  onFulfilled: (input: Output) => any;
  onRejected: (input: unknown) => any;
  onSettled: () => any;
}) => {
  const trackedPromise = core.makeTrackedPromise<Input, Output>({
    asyncFunction,
    onFulfilled,
    onRejected,
    onSettled,
  });

  return reactive(trackedPromise);
};
