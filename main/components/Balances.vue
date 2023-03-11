<script lang="ts" setup>
import { useAccountsStore } from "../modules/accounts/use-accounts-store.js";
import { useBalancesStore } from "../modules/balances/use-balances-store.js";

const accountsStore = useAccountsStore();
const balancesStore = useBalancesStore();

balancesStore.getBalances();
</script>

<template>
  <div>
    <h1>Balances</h1>

    <div v-if="balancesStore.balances.loading">Loading balances...</div>

    <div v-if="balancesStore.balances.error">
      {{ balancesStore.balances.error.message }}
    </div>

    <div v-if="balancesStore.balances.retrievedAt">
      {{ balancesStore.balances.retrievedAt.toISOString() }}
    </div>

    <pre v-if="balancesStore.balances.ready && accountsStore.accounts.ready">{{
      balancesStore.balances.data.map((balance) => ({
        ...balance,
        name: accountsStore.accountsByID[balance.accountID]?.name,
      }))
    }}</pre>
  </div>
</template>
