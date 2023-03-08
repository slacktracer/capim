import { defineStore } from "pinia";
import { reactive, readonly, toRefs } from "vue";

import * as main from "../../../core/main.js";
import { getInitialUserStoreState } from "./get-initial-user-store-state.js";

export const useUserStore = defineStore("user", () => {
  const state = reactive(getInitialUserStoreState());

  const setUser = ({ user }: any) => {
    state.user = user;
  };

  const $reset = () => void Object.assign(state, getInitialUserStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...toRefs(readonly(state)),
    setUser,
  };
});
