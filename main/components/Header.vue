<script lang="ts" setup>
import { logout } from "../modules/authentication/logout.js";
import { useUserStore } from "../modules/user/use-user-store.js";

const userStore = useUserStore();
</script>

<template>
  <header>
    <nav>
      <div class="dropdown">
        <button
          aria-expanded="false"
          class="btn btn-outline-dark dropdown-toggle btn-sm"
          data-bs-toggle="dropdown"
          type="button"
        >
          Menu
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li>
            <NuxtLink class="dropdown-item" to="/accounts">Accounts</NuxtLink>
          </li>
          <li>
            <NuxtLink class="dropdown-item" to="/balances">Balances</NuxtLink>
          </li>
          <li>
            <NuxtLink class="dropdown-item" to="/categories">
              Categories
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="dropdown-item" to="/operations">
              Operations
            </NuxtLink>
          </li>
          <li><NuxtLink class="dropdown-item" to="/tags">Tags</NuxtLink></li>
          <li>
            <NuxtLink class="dropdown-item" to="/transfers">Transfers</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        username: {{ userStore.user?.username }} |
        <a href="#" @click.prevent="logout">Logout</a>
      </div>
    </nav>
  </header>
</template>

<style>
header {
  padding: 1rem;
}

nav {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
