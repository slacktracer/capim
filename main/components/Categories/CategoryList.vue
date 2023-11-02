<script lang="ts" setup>
import { useRetrievedAt } from "../../composables/use-retrieved-at.js";
import type { Category } from "../../core/types/Category.js";
import { useCategoriesStore } from "../../modules/categories/use-categories-store.js";
import type { UseRetrievedAt } from "../../types/UseRetrievedAt.js";

const categoriesStore = useCategoriesStore();

categoriesStore.getCategories();

const retrievedAt = useRetrievedAt<UseRetrievedAt<Category[]>>({
  collection: categoriesStore.categories,
});
</script>

<template>
  <div>
    <section class="header">
      <h1>Categories</h1>

      <div v-if="categoriesStore.categories.error">
        {{ categoriesStore.categories.error.message }}
      </div>

      <div v-if="categoriesStore.categories.loading">Loading categories...</div>

      <div
        v-if="
          !categoriesStore.categories.loading &&
          categoriesStore.categories.retrievedAt
        "
      >
        Retrieved
        {{ retrievedAt }}
        ago
      </div>
    </section>

    <main>
      <div
        v-for="(category, index) in categoriesStore.categories.data"
        :key="category.categoryID"
      >
        {{ String(index + 1).padStart(3, "0") }}) {{ category.name }}
      </div>
    </main>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}

main {
  font-family: monospace;
  margin-bottom: 1rem;
  margin-inline: 1rem;
}
</style>
