<script lang="ts" setup>
import { useRetrievedAt } from "../../composables/use-retrieved-at.js";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import type { UseRetrievedAtOf } from "../../types/UseRetrievedAtOf.js";
import OperationListItem from "./OperationListItem.vue";
import OperationsDatetimeRangeSelector from "./OperationsDatetimeRangeSelector.vue";

const operationsStore = useOperationsStore();

const { from, to } = core.getSearchParamsFromURL();

operationsStore.setDatetimeRange({ from, to });

operationsStore.getOperations({
  from: operationsStore.datetimeRange[0],
  to: operationsStore.datetimeRange[1],
});

const retrievedAt = useRetrievedAt<UseRetrievedAtOf<Operation[]>>({
  collection: operationsStore.operations,
});
</script>

<template>
  <div>
    <section class="header">
      <h1>Operations</h1>

      <OperationsDatetimeRangeSelector />

      <div v-if="operationsStore.operations.error">
        {{ operationsStore.operations.error.message }}
      </div>

      <div v-if="operationsStore.operations.loading">Loading operations...</div>

      <div
        v-if="
          !operationsStore.operations.loading &&
          operationsStore.operations.retrievedAt
        "
      >
        Retrieved
        {{ retrievedAt }}
        ago
      </div>
    </section>

    <section>
      <div
        v-for="[date, operations] in operationsStore.operationsByDate"
        :key="date"
      >
        <div class="date">
          {{ date }}
        </div>

        <div
          v-for="(operation, index) in operations"
          :key="operation.operationID"
        >
          <OperationListItem :operation="operation" />

          <hr
            v-if="index !== operations.length - 1"
            class="operations-separator"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 1rem;
}

.date {
  align-items: center;
  background: hsla(0, 0%, 95%, 1);
  display: flex;
  font-size: 1.1rem;
  height: 2.25rem;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1;
}

.operations-separator {
  border-top: 1px dotted hsla(0, 0%, 95%, 1);
  margin-block: 0;
}
</style>
