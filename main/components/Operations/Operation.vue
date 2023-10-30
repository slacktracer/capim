<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useRetrievedAt } from "../../composables/use-retrieved-at.js";
import type { Operation } from "../../core/types/Operation.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import type { UseRetrievedAtOf } from "../../types/UseRetrievedAtOf.js";

const route = useRoute();

const operationsStore = useOperationsStore();

if (typeof route.params.id === "string") {
  operationsStore.getOperation({ operationID: route.params.id });
}

const retrievedAt = useRetrievedAt<UseRetrievedAtOf<Operation>>({
  collection: operationsStore.operation,
});

const editableOperation = computed(() => {
  const editableOperation: Operation & {
    atDate: string;
    atTime: string;
  } = {
    ...operationsStore.operation.data,
    atDate: operationsStore.operation.data?.at?.slice(0, 10),
    atTime: operationsStore.operation.data?.at?.slice(11, 16),
  };

  return editableOperation;
});
</script>

<template>
  <div>
    <section class="header">
      <h1>Operation</h1>

      <div v-if="operationsStore.operation.error">
        {{ operationsStore.operation.error.message }}
      </div>

      <div v-if="operationsStore.operation.loading">Loading operation...</div>

      <div
        v-if="
          !operationsStore.operation.loading &&
          operationsStore.operation.retrievedAt
        "
      >
        Retrieved
        {{ retrievedAt }}
        ago
      </div>
    </section>

    <section v-if="operationsStore.operation.ready === true" class="operation">
      <form>
        <fieldset disabled>
          <div class="at mb-3">
            <input
              id="atDate"
              v-model="editableOperation.atDate"
              class="form-control"
              type="date"
            />
            <input
              id="atTime"
              v-model="editableOperation.atTime"
              class="form-control"
              type="time"
            />
          </div>

          <div class="mb-3">
            <input
              id="accountName"
              v-model="editableOperation.account.name"
              class="form-control"
              type="text"
            />
          </div>

          <div class="mb-3">
            <input
              id="categoryName"
              v-model="editableOperation.category.name"
              class="form-control"
              type="text"
            />
          </div>

          <div class="mb-3">
            <input
              id="amount"
              v-model="editableOperation.amount"
              class="form-control"
              type="text"
            />
          </div>

          <div class="mb-3">
            <textarea
              id="comments"
              v-model="editableOperation.comments"
              class="form-control"
              rows="3"
            ></textarea>
          </div>
        </fieldset>
      </form>
    </section>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}

.operation {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}

.at {
  display: flex;
  gap: 1rem;
}

.at input {
  text-align: center;
}
</style>
