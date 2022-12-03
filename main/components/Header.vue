<script lang="ts" setup>
import { navigateTo } from "#imports";
import { useStore } from "../stores/main-store.js";

const store = useStore();

const logout = async () => {
  await store.logout();

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
      username: {{ store.state.user?.username }} |
      <a @click.prevent="logout" href="#">Logout</a>
    </p>
  </header>
</template>

<style>
header {
  padding: 1rem;
}
</style>
