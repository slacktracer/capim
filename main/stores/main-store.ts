import { defineStore } from "pinia";
import type { Ref } from "vue";
import { reactive } from "vue";

import * as main from "../core/main.js";

type MainStore = {
  getAccounts: () => Promise<void>;
  getBalances: () => Promise<void>;
  getOperations: () => Promise<void>;
  getTags: () => Promise<void>;
  login: (args: {
    password: Ref<string>;
    username: Ref<string>;
  }) => Promise<void>;
  logout: () => Promise<void>;
  state: main.State;
};

export const useStore = defineStore("main", () => {
  const state: main.State = reactive({
    accounts: [],
    balances: [],
    operations: [],
    tagKeysByID: [],
    tags: { keys: [], values: [] },
    tagValuesByID: [],
    user: null,
  });

  const getAccounts = async () => {
    const accounts = await main.getAccounts();

    state.accounts = accounts as main.Account[];
  };

  const getBalances = async () => {
    const balances = await main.getBalances();

    state.balances = balances as main.Balance[];
  };

  const getOperations = async () => {
    const operations = await main.getOperations();

    state.operations = operations as main.Operation[];
  };

  const getTags = async () => {
    const tags = await main.getTags();

    state.tags = tags as { keys: main.TagKey[]; values: main.TagValue[] };
  };

  const login = async ({
    password,
    username,
  }: {
    password: Ref<string>;
    username: Ref<string>;
  }) => {
    const user = await main.login({
      password: password.value,
      username: username.value,
    });

    state.user = user as main.User;
  };

  const logout = async () => {
    await main.logout();

    state.user = {} as main.User;
  };

  return {
    getAccounts,
    getBalances,
    getOperations,
    getTags,
    login,
    logout,
    state,
  } as MainStore;
});
