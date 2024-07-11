<script lang="ts" setup>
import { format } from "date-fns";
import { computed } from "vue";

import type { Operation } from "../../core/types/Operation.js";
import { useAccountsStore } from "../../modules/accounts/use-accounts-store.js";

const props = defineProps<{
  operation: Operation;
}>();

const accountStore = useAccountsStore();

const justCreated = computed(() => {
  const diff = Date.now() - new Date(props.operation.createdAt).getTime();

  return diff < 1000 * 60 * 5;
});

const justUpdated = computed(() => {
  if (props.operation.updatedAt !== null) {
    const diff = Date.now() - new Date(props.operation.updatedAt).getTime();

    return diff < 1000 * 60 * 5;
  }

  return false;
});
</script>

<template>
  <NuxtLink :to="`/operations/${operation.operationID}`">
    <div>
      <div class="operation">
        <div class="time">
          <div>
            {{ format(new Date(props.operation.at), "HH:mm") }}
          </div>
        </div>

        <div class="category-and-comments">
          <div class="category">
            {{ props.operation.category.name }}

            <span class="badge-container">
              <span
                v-if="justCreated"
                class="badge rounded-pill text-bg-success"
              >
                <span class="badge-content"> Just Created </span>
              </span>
            </span>

            <span class="badge-container">
              <span
                v-if="justUpdated"
                class="badge rounded-pill text-bg-success"
              >
                <span class="badge-content"> Just Updated </span>
              </span>
            </span>
          </div>

          <div class="comments">
            <span v-if="props.operation.comments">{{
              props.operation.comments
            }}</span>
            <i v-else class="no-comments">No comments</i>
          </div>
        </div>

        <div class="amount-and-account">
          <div class="amount">
            {{ (props.operation.amount / 100).toFixed(2) }}
          </div>

          <div class="account">
            {{ accountStore.accountsByID[props.operation.accountID].name }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
a:has(.operation) {
  text-decoration: none;
}

.operation {
  background: hsla(0, 0%, 100%, 1);
  color: var(--bs-body-color);
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
}

.operation:hover {
  background: hsla(0, 0%, 95%, 1);
}

.operation:focus {
  background: hsla(0, 0%, 95%, 1);
  outline: none;
}

.operation:active {
  background: hsla(303, 100%, 50%, 0.5);
}

.time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.category-and-comments {
  flex-grow: 1;
}

.category {
  font-size: 1.1rem;
  font-weight: bold;
}

.comments {
  font-size: 0.9rem;
}

.no-comments {
  color: gray;
}

.amount {
  font-size: 1.1rem;
  font-weight: bold;
  text-align: right;
}

.account {
  color: gray;
  font-size: 0.9rem;
  text-align: right;
}

.badge-container {
  opacity: 0.75;
}

.badge-content {
  font-variant: all-petite-caps;
}
</style>
