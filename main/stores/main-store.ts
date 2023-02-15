import { defineStore } from "pinia";
import type { Ref } from "vue";
import { reactive, readonly } from "vue";

import { navigateTo } from "#app";

import * as main from "../core/main.js";
import { getMainStoreDefaultState } from "./get-main-store-default-state.js";

type MainStore = {
  boot: () => Promise<void>;
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
  const state: main.State = reactive(getMainStoreDefaultState());

  const boot = async () => {
    const initialState = await main.boot();

    if (initialState !== false) {
      Object.assign(state, initialState);
    } else {
      await logout();
    }
  };

  const getAccounts = async () => {
    const accounts = await main.getAccounts();

    state.accounts = accounts;
  };

  const getBalances = async () => {
    const balances = await main.getBalances();

    state.balances = balances;
  };

  const getOperations = async () => {
    const operations = await main.getOperations();

    state.operations = operations;
  };

  const getTags = async () => {
    const tags = await main.getTags();

    state.tags = tags;
  };

  const login = async ({
    password,
    username,
  }: {
    password: Ref<string>;
    username: Ref<string>;
  }) => {
    await main.login({
      password: password.value,
      username: username.value,
    });

    navigateTo("/");

    await boot();
  };

  const logout = async () => {
    navigateTo("/login");

    Object.assign(state, getMainStoreDefaultState());

    await main.logout();
  };

  main.mainEventBus.on("logout", logout);

  return {
    boot,
    getAccounts,
    getBalances,
    getOperations,
    getTags,
    login,
    logout,
    state: readonly(state),
  } as MainStore;
});
