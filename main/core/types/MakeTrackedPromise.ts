import type { PromiseAction } from "./PromiseAction";
import type { TrackedPromise } from "./TrackedPromise";

export type MakeTrackedPromise = <Input, Output>(input: {
  action: PromiseAction;
  asyncFunction: (input: Input) => Promise<Output> | never;
  onFulfilled: (input: Output) => any;
  onRejected: (input: unknown) => any;
  onSettled: () => any;
}) => TrackedPromise<Input, Output>;
