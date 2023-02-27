<script lang="ts" setup>
import { useAccountsStore } from "../stores/accounts/use-accounts-store.js";
import { useBalancesStore } from "../stores/balances/use-balances-store.js";

const accountsStore = useAccountsStore();
const balancesStore = useBalancesStore();

balancesStore.getBalances();

const { accounts } = accountsStore.state;
const { balances } = balancesStore.state;
</script>

<template>
  <div>
    <h1>Balances</h1>

    <div v-if="balances.loading">Loading balances...</div>

    <div v-if="balances.error">{{ balances.error.message }}</div>

    <div v-if="balances.retrievedAt">
      {{ balances.retrievedAt.toISOString() }}
    </div>

    <pre v-if="balances.ready && accounts.ready">{{
      balances.data.map((balance) => ({
        ...balance,
        name: accountsStore.computed.accountsByID[balance.accountID]?.name,
      }))
    }}</pre>
  </div>
</template>
