import { defineStore } from "pinia";

import * as main from "../core/main.js";
import { useAccountsStore } from "./use-accounts-store.js";
import { useAuthenticationStore } from "./use-authentication-store.js";
import { useTagsStore } from "./use-tags-store.js";
import { useUserStore } from "./use-user-store.js";

export const useBootStore = defineStore("boot", () => {
  const boot = () => {
    const userIsLoggedIn = main.isUserLoggedIn();

    if (userIsLoggedIn) {
      const accountsStore = useAccountsStore();
      const tagsStore = useTagsStore();
      const userStore = useUserStore();

      accountsStore.getAccounts();
      tagsStore.getTags();

      const user = main.getLocalUserInfo();

      userStore.setUser({ user });
    } else {
      const authenticationStore = useAuthenticationStore();

      authenticationStore.logout();
    }
  };

  return { boot };
});
