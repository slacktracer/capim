<script lang="ts" setup>
import { useStore } from "../stores/main-store.js";

const store = useStore();

store.getBalances();
</script>

<template>
  <div>
    <h1>Balances</h1>

    <div v-for="balance in store.state.balances">
      {{ store.state.accountsByID[balance.accountID].name }} |
      {{ balance.total }}
    </div>

    <pre>{{ store.state.balances }}</pre>
  </div>
</template>
