import { core } from "../../core/core.js";
import { useAccountsStore } from "../accounts/use-accounts-store.js";
import { logout } from "../authentication/logout.js";
import { useTagsStore } from "../tags/use-tags-store.js";
import { useUserStore } from "../user/use-user-store.js";

export const boot = () => {
  const userIsLoggedIn = core.isUserLoggedIn();

  if (userIsLoggedIn) {
    const accountsStore = useAccountsStore();
    const tagsStore = useTagsStore();
    const userStore = useUserStore();

    accountsStore.getAccounts();
    tagsStore.getTags();

    const user = core.getLocalUserInfo();

    userStore.setUser({ user });
  } else {
    logout();
  }
};
