<script lang="ts" setup>
import { useTransfersStore } from "../modules/transfers/use-transfers-store.js";

const transfersStore = useTransfersStore();

transfersStore.getTransfers();
</script>

<template>
  <div class="header">
    <h1>Transfers</h1>

    <div v-if="transfersStore.transfers.loading">Loading transfers...</div>

    <div v-if="transfersStore.transfers.error">
      {{ transfersStore.transfers.error.message }}
    </div>

    <div v-if="transfersStore.transfers.retrievedAt">
      {{ transfersStore.transfers.retrievedAt.toISOString() }}
    </div>

    <pre v-if="transfersStore.transfers.ready">{{
      transfersStore.transfers.data
    }}</pre>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}
</style>
