import { formatDistanceToNowStrict } from "date-fns";
import { ref, watch } from "vue";

import type { UseRetrievedAt } from "../types/UseRetrievedAt";

export const useRetrievedAt: UseRetrievedAt = ({ collection }) => {
  const retrievedAt = ref("");

  let intervalID: ReturnType<typeof setInterval>;

  const setRetrievedAtDistanceToNowStrict = () => {
    retrievedAt.value = formatDistanceToNowStrict(
      collection.retrievedAt || new Date(),
    );

    if (intervalID) {
      clearInterval(intervalID);
    }

    intervalID = setInterval(setRetrievedAtDistanceToNowStrict, 5 * 1000);
  };

  setRetrievedAtDistanceToNowStrict();

  watch(() => collection.retrievedAt, setRetrievedAtDistanceToNowStrict);

  return retrievedAt;
};
