import { navigateTo } from "#app";

import * as main from "../../core/main.js";
import { useAccountsStore } from "../accounts/use-accounts-store.js";
import { logout } from "../authentication/logout.js";
import { useTagsStore } from "../tags/use-tags-store.js";
import { useUserStore } from "../user/use-user-store.js";

export const boot = () => {
  const userIsLoggedIn = main.isUserLoggedIn();

  if (userIsLoggedIn) {
    navigateTo("/");

    const accountsStore = useAccountsStore();
    const tagsStore = useTagsStore();
    const userStore = useUserStore();

    accountsStore.getAccounts();
    tagsStore.getTags();

    const user = main.getLocalUserInfo();

    userStore.setUser({ user });
  } else {
    logout();
  }
};
