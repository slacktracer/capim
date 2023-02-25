<script lang="ts" setup>
import { useAccountsStore } from "../stores/use-accounts-store.js";

const accountsStore = useAccountsStore();
</script>

<template>
  <div>
    <h1>Capim</h1>
    <div v-if="accountsStore.state.accounts.loading">Loading accounts...</div>
  </div>
</template>
