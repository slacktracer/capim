import type { TrackedAsyncFunctionState } from "./TrackedAsyncFunctionState";

export type MakeTrackedAsyncFunction = <Input, Output>(input: {
  asyncFunction: (input: Input) => Promise<Output>;
  state: TrackedAsyncFunctionState<Output>;
}) => (input: Input) => void;
