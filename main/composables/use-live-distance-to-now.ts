import { formatDistanceToNowStrict } from "date-fns";
import { ref } from "vue";

import type { UseLiveDistanceToNow } from "../types/UseLiveDistanceToNow";

export const useLiveDistanceToNow: UseLiveDistanceToNow = ({
  object,
  propertyName,
}) => {
  const liveDistanceToNow = ref();

  let intervalID: ReturnType<typeof setInterval>;

  const setLiveDistanceToNowStrict = () => {
    liveDistanceToNow.value = formatDistanceToNowStrict(
      object[propertyName] || new Date(),
    );

    if (intervalID) {
      clearInterval(intervalID);
    }

    intervalID = setInterval(setLiveDistanceToNowStrict, 5 * 1000);
  };

  setLiveDistanceToNowStrict();

  return liveDistanceToNow;
};
