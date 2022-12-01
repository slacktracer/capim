import { defineStore } from "pinia";
import type { Ref } from "vue";
import { reactive } from "vue";

import * as main from "../core/main.js";

type Account = Record<string, any>;
type Balance = Record<string, any>;
type User = Record<string, any>;
type Tag = Record<string, any>;

type StoreState = {
  accounts: Account[];
  balances: Balance[];
  tags: Tag[];
  user: User;
};

export const useStore = defineStore("main", () => {
  const state: StoreState = reactive({
    accounts: [],
    balances: [],
    tags: [],
    user: JSON.parse(main.storage.getItem("user") || "{}"),
  });

  const getAccounts = async () => {
    const accounts = await main.getAccounts();

    state.accounts = accounts as Account[];
  };

  const getBalances = async () => {
    const balances = await main.getBalances();

    state.balances = balances as Balance[];
  };

  const getTags = async () => {
    const tags = await main.getTags();

    console.log(3);

    state.tags = tags as Tag[];
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

    state.user = user as User;
  };

  const logout = async () => {
    await main.logout();

    state.user = {};
  };

  return {
    getAccounts,
    getBalances,
    getTags,
    login,
    logout,
    state,
  };
});
