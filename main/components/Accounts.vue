<script lang="ts" setup>
import { useAccountsStore} from "../stores/use-accounts-store.js";

const accountsStore = useAccountsStore();
</script>

<template>
  <div>
    <h1>Accounts</h1>

    <pre>{{ accountsStore.state.accounts.data }}</pre>
  </div>
</template>
