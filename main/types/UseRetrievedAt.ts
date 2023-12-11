import type { Ref } from "vue";

import type { TrackedPromise } from "../core/types/TrackedPromise";

export type UseRetrievedAt = <Data>(input: {
  value: TrackedPromise<Readonly<Data>, any>;
}) => Ref<string>;
