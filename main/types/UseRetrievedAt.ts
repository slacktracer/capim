import type { Ref } from "vue";

import type { TrackedAsyncFunctionState } from "../core/types/TrackedAsyncFunctionState";

export type UseRetrievedAt = <Data>(input: {
  data: TrackedAsyncFunctionState<Readonly<Data>>;
}) => Ref<string>;
