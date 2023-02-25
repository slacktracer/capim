import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

import * as main from "../core/main.js";
import type { LocalUserInfo } from "../types/LocalUserInfo.js";

export const useUserStore = defineStore("user", () => {
  const user: Ref<LocalUserInfo | undefined> = ref(undefined);

  const setUser = ({ user: _user }: any) => {
    user.value = _user;
  };

  const $reset = () => {
    user.value = undefined;
  };

  main.mainEventBus.on("reset-all", $reset);

  return { setUser, user, $reset };
});
