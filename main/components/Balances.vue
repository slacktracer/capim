<script lang="ts" setup>
import { useAccountsStore} from "../stores/use-accounts-store.js";
import { useBalancesStore} from "../stores/use-balances-store.js";

const accountsStore = useAccountsStore();
const balancesStore = useBalancesStore();

balancesStore.getBalances();
</script>

<template>
  <div>
    <h1>Balances</h1>

    <div v-if="balancesStore.state.balances.loading">Loading...</div>

    <div v-if="balancesStore.state.balances.error.message">{{ balancesStore.state.balances.error.message }}</div>

    <pre>{{
      balancesStore.state.balances.data.map((balance) => ({
        ...balance,
        name: accountsStore.state.accountsByID[balance.accountID].name,
      }))
    }}</pre>
  </div>
</template>
