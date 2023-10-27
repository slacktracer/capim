import { defineStore } from "pinia";
import { computed, reactive, readonly, toRefs } from "vue";

import { core } from "../../core/core.js";
import type { Account } from "../../core/types/Account.js";
import type { AccountsStoreState } from "../../types/AccountsStoreState.js";
import { loadDataIntoState } from "../common/utils/load-data-into-state.js";
import { getInitialAccountsStoreState } from "./get-initial-accounts-store-state.js";

export const useAccountsStore = defineStore("accounts", () => {
  const state: AccountsStoreState = reactive(getInitialAccountsStoreState());

  const accountsByID = computed(() =>
    core.makeAccountsByID({ accounts: state.accounts.data }),
  );

  const getAccounts = () => {
    if (state.accounts.ready) {
      return;
    }

    loadDataIntoState<Account[]>({
      functionToCall: () => core.getAccounts(),
      stateToUpdate: state.accounts,
    });
  };

  const $reset = () =>
    void Object.assign(state, getInitialAccountsStoreState());

  core.mainEventBus.on("reset-all", $reset);

  return {
    $reset,
    ...toRefs(readonly(state)),
    accountsByID,
    getAccounts,
  };
});
