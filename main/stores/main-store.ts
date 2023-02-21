import { defineStore } from "pinia";
import type { Ref } from "vue";
import { reactive, readonly } from "vue";

import * as main from "../core/main.js";
import { MainStore } from "../types/MainStore.js";
import * as actions from "./actions/actions.js";
import { getMainStoreDefaultState } from "./get-main-store-default-state.js";

export const useStore = defineStore("main", () => {
  const state: main.State = reactive(getMainStoreDefaultState());

  const boot = () => actions.boot(state, storeActions);

  const getAccounts = () => actions.getAccounts(state);

  const getBalances = () => actions.getBalances(state);

  const getOperations = () => actions.getOperations(state);

  const getTags = () => actions.getTags(state);

  const login = ({
    password,
    username,
  }: {
    password: Ref<string>;
    username: Ref<string>;
  }) =>
    actions.login(state, storeActions, {
      password,
      username,
    });

  const logout = () => actions.logout(state);

  const storeActions = {
    boot,
    getAccounts,
    getBalances,
    getOperations,
    getTags,
    login,
    logout,
  };

  main.mainEventBus.on("logout", logout);

  return {
    ...storeActions,
    state: readonly(state),
  } as MainStore;
});
