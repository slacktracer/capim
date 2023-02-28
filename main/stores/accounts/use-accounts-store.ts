import { defineStore } from "pinia";
import { computed, reactive, readonly } from "vue";

import type { Account } from "../../core/main.js";
import * as main from "../../core/main.js";
import type { AccountsStoreState } from "../../types/AccountsStoreState.js";
import { loadDataIntoState } from "../../utils/load-data-into-state.js";
import { getInitialAccountsStoreState } from "./get-initial-accounts-store-state.js";

export const useAccountsStore = defineStore("accounts", () => {
  const state: AccountsStoreState = reactive(getInitialAccountsStoreState());

  const computedState = {
    accountsByID: computed(() =>
      main.makeAccountsByID({ accounts: state.accounts.data }),
    ),
  };

  const getAccounts = () => {
    if (state.accounts.ready) {
      return;
    }

    loadDataIntoState<Account[]>({
      functionToCall: () => main.getAccounts(),
      stateToUpdate: state.accounts,
    });
  };

  const $reset = () =>
    void Object.assign(state, getInitialAccountsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return {
    computed: computedState,
    getAccounts,
    state: readonly(state),
    $reset,
  };
});
