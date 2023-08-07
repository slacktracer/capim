<script lang="ts" setup>
import { format } from "date-fns";
import { computed } from "vue";

import type { Operation } from "../../core/types/Operation.js";
import { useAccountsStore } from "../../modules/accounts/use-accounts-store.js";
import { useTagsStore } from "../../modules/tags/use-tags-store.js";

const props = defineProps<{
  operation: Operation;
}>();

const accountStore = useAccountsStore();
const tagStore = useTagsStore();

const category = computed(
  () =>
    tagStore.tagValuesByID[
      props.operation.tags[tagStore.mainTagKeysIDs.categoryTagKeyID!]
    ].name,
);
</script>

<template>
  <NuxtLink class="operation" :to="`/operations/${operation.operationID}`">
    <div class="time">
      <div>
        {{ format(new Date(props.operation.at), "HH:mm") }}
      </div>
    </div>

    <div class="category-and-comments">
      <div class="category">{{ category }}</div>

      <div class="comments">
        <span v-if="props.operation.comments">{{
          props.operation.comments
        }}</span>
        <i v-else class="no-comments">No comments</i>
      </div>
    </div>

    <div class="amount-and-account">
      <div class="amount">{{ (props.operation.amount / 100).toFixed(2) }}</div>

      <div class="account">
        {{ accountStore.accountsByID[props.operation.accountID].name }}
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.operation {
  color: var(--bs-body-color);
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  text-decoration: none;
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
</style>
