import { defineStore } from "pinia";
import { computed, reactive, readonly } from "vue";

import { Account } from "../../core/main.js";
import * as main from "../../core/main.js";
import { AccountsStoreState } from "../../types/AccountsStoreState.js";
import { loadAsyncDataIntoReactiveState } from "../../utils/load-async-data-into-reactive-state.js";
import { getInitialAccountsStoreState } from "./get-initial-accounts-store-state.js";

export const useAccountsStore = defineStore("accounts", () => {
  const state: AccountsStoreState = reactive(getInitialAccountsStoreState());

  const computedState = {
    accountsByID: computed(() =>
      main.makeAccountsByID({ accounts: state.accounts.data }),
    ),
  };

  const getAccounts = async () => {
    if (state.accounts.ready) {
      return;
    }

    await loadAsyncDataIntoReactiveState<Account[]>({
      functionToCall: main.getAccounts,
      stateToMutate: state.accounts,
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
