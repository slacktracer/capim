<script lang="ts" setup>
import { navigateTo } from "#app";

import { useAuthenticationStore } from "../stores/modules/authentication/use-authentication-store.js";
import { useUserStore } from "../stores/modules/user/use-user-store.js";

const authenticationStore = useAuthenticationStore();
const userStore = useUserStore();

const logout = async () => {
  await authenticationStore.logout();

  navigateTo("/login");
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/accounts">Accounts</NuxtLink></li>
        <li><NuxtLink to="/balances">Balances</NuxtLink></li>
        <li><NuxtLink to="/operations">Operations</NuxtLink></li>
        <li><NuxtLink to="/tags">Tags</NuxtLink></li>
        <li><NuxtLink to="/transfers">Transfers</NuxtLink></li>
      </ul>
    </nav>
    <p>
      username: {{ userStore.user?.username }} |
      <a href="#" @click.prevent="logout">Logout</a>
    </p>
  </header>
</template>

<style>
header {
  padding: 1rem;
}
</style>
