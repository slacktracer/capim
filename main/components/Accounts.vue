<script lang="ts" setup>
import { useAccountsStore } from "../stores/accounts/use-accounts-store.js";

const accountsStore = useAccountsStore();

const { accounts } = accountsStore.state;
</script>

<template>
  <div>
    <h1>Accounts</h1>

    <div v-if="accounts.loading">Loading accounts...</div>

    <div v-if="accounts.error">{{ accounts.error.message }}</div>

    <div v-if="accounts.retrievedAt">
      {{ accounts.retrievedAt.toISOString() }}
    </div>

    <pre v-if="accounts.ready">{{ accounts.data }}</pre>
  </div>
</template>
