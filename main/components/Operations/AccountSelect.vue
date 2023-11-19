<script setup lang="ts">
import { computed } from "vue";
import type { ComputedRef } from "vue/dist/vue.js";

import { useAccountsStore } from "../../modules/accounts/use-accounts-store.js";
import type { AccountSelectOption } from "../../types/AccountSelectOption.js";

const emit = defineEmits<{ accountSelected: [newValue: string] }>();

const props = defineProps<{
  selectedAccount: string | undefined;
}>();

const accountsStore = useAccountsStore();

const accountList: ComputedRef<AccountSelectOption[]> = computed(() =>
  accountsStore.accounts.data.map(({ accountID, name }) => ({
    accountID,
    name,
  })),
);

const emitAccountSelectedEvent = (event: Event) => {
  emit("accountSelected", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div>
    <label class="visually-hidden" for="account">Account</label>

    <select
      class="form-select"
      name="account"
      @change="emitAccountSelectedEvent"
    >
      <option
        v-for="account in accountList"
        id="account"
        :key="account.accountID"
        :selected="props.selectedAccount === account.accountID"
        :value="account.accountID"
      >
        {{ account.name }}
      </option>
    </select>
  </div>
</template>
