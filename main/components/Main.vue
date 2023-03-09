<script lang="ts" setup>
import { useAccountsStore } from "../modules/accounts/use-accounts-store.js";
import { useTagsStore } from "../modules/tags/use-tags-store.js";

const accountsStore = useAccountsStore();
const tagsStore = useTagsStore();

const { accounts } = accountsStore.state;
</script>

<template>
  <div>
    <h1>Capim</h1>

    <div v-if="accounts.loading">Loading accounts...</div>

    <div v-if="accounts.error">{{ accounts.error.message }}</div>

    <div v-if="tagsStore.tags.loading">Loading tags...</div>

    <div v-if="tagsStore.tags.error">{{ tagsStore.tags.error.message }}</div>
  </div>
</template>
