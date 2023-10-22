import { formatDistanceToNowStrict } from "date-fns";
import { ref, watch } from "vue";

import type { AsyncDataState } from "../types/AsyncDataState.js";

export const useRetrievedAt = <Collection extends AsyncDataState<unknown>>({
  collection,
}: {
  collection: Collection;
}) => {
  const retrievedAt = ref("");

  let intervalID: ReturnType<typeof setInterval>;

  const setRetrievedAtDistanceToNowStrict = () => {
    retrievedAt.value = formatDistanceToNowStrict(
      collection.retrievedAt || new Date(),
    );

    if (intervalID) {
      clearInterval(intervalID);
    }

    intervalID = setInterval(setRetrievedAtDistanceToNowStrict, 11 * 1000);
  };

  setRetrievedAtDistanceToNowStrict();

  watch(() => collection.retrievedAt, setRetrievedAtDistanceToNowStrict);

  return retrievedAt;
};
