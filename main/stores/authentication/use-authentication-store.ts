import { defineStore } from "pinia";
import type { Ref } from "vue";

import { navigateTo } from "#app";

import * as main from "../../core/main.js";
import { useBootStore } from "../boot/use-boot-store.js";

export const useAuthenticationStore = defineStore("authentication", () => {
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

    const bootStore = useBootStore();

    await bootStore.boot();
  };

  const logout = async () => {
    navigateTo("/login");

    main.mainEventBus.emit("reset-all");

    await main.logout();
  };

  main.mainEventBus.on("logout", logout);

  return { login, logout };
});
