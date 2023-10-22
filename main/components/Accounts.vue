<script lang="ts" setup>
import { useAccountsStore } from "../modules/accounts/use-accounts-store.js";

const accountsStore = useAccountsStore();
</script>

<template>
  <div class="header">
    <h1>Accounts</h1>

    <div v-if="accountsStore.accounts.loading">Loading accounts...</div>

    <div v-if="accountsStore.accounts.error">
      {{ accountsStore.accounts.error.message }}
    </div>

    <div v-if="accountsStore.accounts.retrievedAt">
      {{ accountsStore.accounts.retrievedAt.toISOString() }}
    </div>

    <pre v-if="accountsStore.accounts.ready">{{
      accountsStore.accounts.data
    }}</pre>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}
</style>
