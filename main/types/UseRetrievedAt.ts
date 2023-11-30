import type { Ref } from "vue";

import type { TrackedAsyncFunctionState } from "../core/types/TrackedAsyncFunctionState";

export type UseRetrievedAt = <Data>(input: {
  collection: TrackedAsyncFunctionState<Readonly<Data>>;
}) => Ref<string>;
