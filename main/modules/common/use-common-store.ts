import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import { version } from "../../../package.json";

// So, this store is "the exception that proves the rule".
// There is no reactive state here (yet). It only exists because of how
// it is not possible to call useRouter outside a setup function...
// Then it looked like it was a good place to store the application version...
// Maybe I should rename it to helperStore.
// Maybe, there is a need to an actual common store (that follows the rule).
// "Tomorrow we will know"
export const useCommonStore = defineStore("common", () => {
  const router = useRouter();

  const [, buildNumber] = version.split("-build.");

  return {
    buildNumber,
    router,
  };
});
