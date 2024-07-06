<script lang="ts" setup>
import { ref, watch } from "vue";

import { useOperationsStore } from "../../modules/operations/use-operations-store.js";

const operationsStore = useOperationsStore();

const saveAndClose = ref(operationsStore.saveAndClose);

watch(
  () => saveAndClose.value,
  (newValue) => {
    operationsStore.updateSaveAndClose(newValue);
  },
);
</script>

<template>
  <div class="form-check form-switch">
    <input
      id="saveAndClose"
      v-model="saveAndClose"
      class="form-check-input"
      role="switch"
      type="checkbox"
    />
  </div>
</template>
