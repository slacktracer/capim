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

    <pre>{{
      balancesStore.balances.data.map((balance) => ({
        ...balance,
        name: accountsStore.accountsByID[balance.accountID].name,
      }))
    }}</pre>
  </div>
</template>
