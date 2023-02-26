import { defineStore } from "pinia";
import { computed, reactive, readonly } from "vue";

import * as main from "../../core/main.js";
import { AccountsStoreState } from "../../types/AccountsStoreState.js";
import { getInitialAccountsStoreState } from "./get-initial-accounts-store-state.js";

export const useAccountsStore = defineStore("accounts", () => {
  const state: AccountsStoreState = reactive(getInitialAccountsStoreState());

  state.accountsByID = computed(() =>
    main.makeAccountsByID({ accounts: state.accounts.data }),
  );

  const getAccounts = async () => {
    state.accounts.ready = false;

    state.accounts.error = false;

    state.accounts.loading = true;

    try {
      state.accounts.data = await main.getAccounts();

      state.accounts.ready = true;

      state.accounts.retrievedAt = new Date();
    } catch (error: unknown) {
      if (error instanceof Error) {
        state.accounts.error = { message: error.message };
      }
    } finally {
      state.accounts.loading = false;
    }
  };

  const $reset = () =>
    void Object.assign(state, getInitialAccountsStoreState());

  main.mainEventBus.on("reset-all", $reset);

  return { getAccounts, state: readonly(state), $reset };
});
