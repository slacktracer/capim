<script lang="ts" setup>
import { formatDistanceToNowStrict } from "date-fns";
import { onMounted, ref } from "vue";

import { getSearchParamsFromURL } from "../../core/utils/get-search-params-from-url.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import OperationListItem from "./OperationListItem.vue";
import OperationsDatetimeRangeSelector from "./OperationsDatetimeRangeSelector.vue";

const operationsStore = useOperationsStore();

const { from, to } = getSearchParamsFromURL();

operationsStore.setDatetimeRange({ from, to });

operationsStore.getOperations({
  from: operationsStore.datetimeRange[0],
  to: operationsStore.datetimeRange[1],
});

const retrievedAt = ref(
  formatDistanceToNowStrict(
    operationsStore.operations.retrievedAt || new Date(),
  ),
);

setInterval(() => {
  retrievedAt.value = formatDistanceToNowStrict(
    operationsStore.operations.retrievedAt || new Date(),
  );
}, 60 * 1000);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        operationsStore.operationsByDateInSegments.length &&
        entry.isIntersecting
      ) {
        operationsStore.increaseAmountOfOperationsToRender();
      }
    });
  });

  const target = document.querySelector(".loading");

  observer.observe(target!);
});
</script>

<template>
  <div>
    <section class="header">
      <h1>Operations</h1>

      <OperationsDatetimeRangeSelector />

      <div v-if="operationsStore.operations.loading">Loading operations...</div>

      <div v-if="operationsStore.operations.error">
        {{ operationsStore.operations.error.message }}
      </div>

      <div v-if="operationsStore.operations.retrievedAt">
        Retrieved
        {{ retrievedAt }}
        ago
      </div>
    </section>

    <section>
      <div
        v-for="[date, operations] in operationsStore.operationsByDateInSegments"
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

    <div
      class="loading"
      @click="operationsStore.increaseAmountOfOperationsToRender()"
    ></div>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 1rem;
  margin-inline: 0.5rem;
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
  border-top: 1px dotted gray;
  margin-block: 0;
}

.loading {
  text-align: center;
}
</style>
