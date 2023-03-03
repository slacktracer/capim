<script lang="ts" setup>
import { useAccountsStore } from "../stores/modules/accounts/use-accounts-store.js";
import { useTagsStore } from "../stores/modules/tags/use-tags-store.js";

const accountsStore = useAccountsStore();
const tagsStore = useTagsStore();

const { accounts } = accountsStore.state;
const { tags } = tagsStore;
</script>

<template>
  <div>
    <h1>Capim</h1>

    <div v-if="accounts.loading">Loading accounts...</div>

    <div v-if="accounts.error">{{ accounts.error.message }}</div>

    <div v-if="tags.loading">Loading tags...</div>

    <div v-if="tags.error">{{ tags.error.message }}</div>
  </div>
</template>
