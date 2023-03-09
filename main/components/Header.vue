<script lang="ts" setup>
import { logout } from "../modules/authentication/logout.js";
import { useUserStore } from "../modules/user/use-user-store.js";

const userStore = useUserStore();
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
