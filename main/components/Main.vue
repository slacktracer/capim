<script lang="ts" setup>
import { useAccountsStore } from "../modules/accounts/use-accounts-store.js";
import { useCategoriesStore } from "../modules/categories/use-categories-store.js";
import { useTagsStore } from "../modules/tags/use-tags-store.js";

const accountsStore = useAccountsStore();
const tagsStore = useTagsStore();
const categoriesStore = useCategoriesStore();
</script>

<template>
  <div class="header">
    <h1>Capim</h1>

    <div v-if="accountsStore.accounts.loading">Loading accounts...</div>

    <div v-if="accountsStore.accounts.error">
      {{ accountsStore.accounts.error.message }}
    </div>

    <div v-if="tagsStore.tags.loading">Loading tags...</div>

    <div v-if="tagsStore.tags.error">{{ tagsStore.tags.error.message }}</div>

    <div v-if="categoriesStore.categories.loading">Loading categories...</div>

    <div v-if="categoriesStore.categories.error">
      {{ categoriesStore.categories.error.message }}
    </div>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}
</style>
