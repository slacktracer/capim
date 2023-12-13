import { reactive } from "vue";

import { core } from "../core/core.js";
import type { PromiseAction } from "../core/types/PromiseAction";

export const useTrackedPromise = <Input, Output>({
  action,
  asyncFunction,
  onFulfilled,
  onRejected,
  onSettled,
}: {
  action: PromiseAction;
  asyncFunction: (input: Input) => Promise<Output> | never;
  onFulfilled: (input: Output) => any;
  onRejected: (input: unknown) => any;
  onSettled: () => any;
}) => {
  const trackedPromise = core.makeTrackedPromise<Input, Output>({
    action,
    asyncFunction,
    onFulfilled,
    onRejected,
    onSettled,
  });

  return reactive(trackedPromise);
};
