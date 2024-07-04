<script lang="ts" setup>
import { format } from "date-fns";
import { onMounted, ref } from "vue";

import { useSwipeOperation } from "../../composables/use-swipe-operation";
import type { Operation } from "../../core/types/Operation.js";
import { useAccountsStore } from "../../modules/accounts/use-accounts-store.js";

const props = defineProps<{
  operation: Operation;
}>();

const accountStore = useAccountsStore();

const operationListItem = ref<HTMLDivElement>(document.createElement("div"));

onMounted(() => {
  useSwipeOperation({ operationListItem });
});

const x = () => {
  alert(`copying operation ${props.operation.operationID}`);
};
</script>

<template>
  <NuxtLink :to="`/operations/${operation.operationID}`">
    <div class="controls">
      <button class="copy" @click.prevent.stop="x">
        <svg class="bi" fill="currentColor" height="24" width="24">
          <use xlink:href="bootstrap-icons/bootstrap-icons.svg#copy" />
        </svg>
      </button>
    </div>

    <div ref="operationListItem" class="operation">
      <div class="time">
        <div>
          {{ format(new Date(props.operation.at), "HH:mm") }}
        </div>
      </div>

      <div class="category-and-comments">
        <div class="category">{{ props.operation.category.name }}</div>

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
  </NuxtLink>
</template>

<style scoped>
a:has(.operation) {
  position: relative;
  text-decoration: none;
}

.operation {
  --translate: 0;

  background: hsla(0, 0%, 100%, 1);
  color: var(--bs-body-color);
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  translate: var(--translate);
  transition: translate 0.2s ease-in-out;
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

.controls {
  align-items: center;
  background: #333333;
  color: whitesmoke;
  display: flex;
  gap: 1rem;
  inset: 0;
  justify-content: end;
  position: absolute;
}

.copy {
  background: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  margin: 1rem;
  padding: 0;
}

.copy:focus-visible {
  outline-offset: 0.25rem;
}
</style>
