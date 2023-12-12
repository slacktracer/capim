import { formatDistanceToNowStrict } from "date-fns";
import { ref, watch } from "vue";

import type { UseRetrievedAt } from "../types/UseRetrievedAt.js";

export const useRetrievedAt: UseRetrievedAt = ({
  dataObject,
  datePropertyName,
}) => {
  const retrievedAt = ref("");

  let intervalID: ReturnType<typeof setInterval>;

  const setRetrievedAtDistanceToNowStrict = () => {
    retrievedAt.value = formatDistanceToNowStrict(
      dataObject[datePropertyName] || new Date(),
    );

    if (intervalID) {
      clearInterval(intervalID);
    }

    intervalID = setInterval(setRetrievedAtDistanceToNowStrict, 5 * 1000);
  };

  setRetrievedAtDistanceToNowStrict();

  watch(() => dataObject[datePropertyName], setRetrievedAtDistanceToNowStrict);

  return retrievedAt;
};
