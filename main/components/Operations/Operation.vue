<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { computed } from "vue";
import VueMultiselect from "vue-multiselect";
import { useRoute } from "vue-router";

import { useEditableResource } from "../../composables/use-editable-resource.js";
import { useRetrievedAt } from "../../composables/use-retrieved-at.js";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import { useAccountsStore } from "../../modules/accounts/use-accounts-store.js";
import { useCategoriesStore } from "../../modules/categories/use-categories-store.js";
import { formatAsLocalisedCurrency } from "../../modules/common/utils/format-as-localised-currency.js";
import { makeScrollToSelectedOnOpen } from "../../modules/common/utils/make-scroll-to-selected-on-open.js";
import { makeEditableOperation } from "../../modules/operations/make-editable-operation.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import type { AccountSelectorListItem } from "../../types/AccountSelectorListItem.js";
import type { AsyncDataState } from "../../types/AsyncDataState.js";
import type { CategorySelectorListItem } from "../../types/CategorySelectorListItem.js";
import type { EditableOperation } from "../../types/EditableOperation.js";
import type { MakeEditableOperation } from "../../types/MakeEditableOperation.js";
import type { UseRetrievedAt } from "../../types/UseRetrievedAt.js";
import AmountInput from "../common/AmountInput.vue";
import Debug from "../common/Debug.vue";
import CategorySelectorOption from "./CategorySelectorOption.vue";

const route = useRoute();

const accountsStore = useAccountsStore();
const categoriesStore = useCategoriesStore();
const operationsStore = useOperationsStore();

if (typeof route.params.id === "string") {
  operationsStore.getOperation({ operationID: route.params.id });
}

const retrievedAt = useRetrievedAt<UseRetrievedAt<Operation>>({
  collection: operationsStore.operation,
});

const accountList: ComputedRef<AccountSelectorListItem[]> = computed(() =>
  accountsStore.accounts.data.map(({ accountID, name }) => ({
    accountID,
    name,
  })),
);

const categoryList: ComputedRef<CategorySelectorListItem[]> = computed(() =>
  categoriesStore.categories.data.map(({ categoryID, group, name }) => ({
    categoryID,
    group,
    name,
  })),
);

const editableOperation: EditableOperation = useEditableResource<
  EditableOperation,
  MakeEditableOperation,
  AsyncDataState<Operation>
>({
  makeEditableResource: makeEditableOperation,
  resource: operationsStore.operation,
});

const amount = computed(() =>
  formatAsLocalisedCurrency({
    currency: "BRL",
    locales: "pt-BR",
    number: Math.abs(
      (editableOperation.amountPerUnit / 100) * editableOperation.unitCount,
    ),
  }),
);

const updateAccount = (account: AccountSelectorListItem) => {
  editableOperation.accountID = account.accountID;
};

const updateCategory = (category: CategorySelectorListItem) => {
  editableOperation.categoryID = category.categoryID;
};

const updateAmounts = (input: number | Event) => {
  const inputIsNumber = typeof input === "number";

  const typeIsExpense = editableOperation.type === "Expense";

  const absoluteNewAmountPerUnit = Math.abs(
    inputIsNumber ? input : editableOperation.amountPerUnit,
  );

  editableOperation.amountPerUnit = typeIsExpense
    ? -absoluteNewAmountPerUnit
    : absoluteNewAmountPerUnit;

  editableOperation.amount =
    editableOperation.unitCount * editableOperation.amountPerUnit;
};
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

    <form>
      <fieldset class="operation" :disabled="operationsStore.operation.loading">
        <div class="date">
          <input
            v-model="editableOperation.atDate"
            class="form-control"
            type="date"
          />
        </div>

        <div class="time">
          <input
            v-model="editableOperation.atTime"
            class="form-control"
            type="time"
          />
        </div>

        <div class="account">
          <VueMultiselect
            v-model="editableOperation.account"
            label="name"
            :options="accountList"
            placeholder="Select an account"
            track-by="accountID"
            @open="makeScrollToSelectedOnOpen({ selector: '.account' })"
            @select="updateAccount"
          ></VueMultiselect>
        </div>

        <div class="category">
          <VueMultiselect
            v-model="editableOperation.category"
            label="name"
            :option-height="56"
            :options="categoryList"
            placeholder="Select a category"
            track-by="categoryID"
            @open="makeScrollToSelectedOnOpen({ selector: '.category' })"
            @select="updateCategory"
          >
            <template #option="props">
              <CategorySelectorOption
                :option="props.option"
              ></CategorySelectorOption>
            </template>
          </VueMultiselect>
        </div>

        <div class="type">
          <label>
            Type

            <select
              v-model="editableOperation.type"
              class="form-control"
              @change="updateAmounts"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </label>
        </div>

        <div class="units">
          <label>
            Units

            <input
              v-model="editableOperation.unitCount"
              class="form-control"
              max="999"
              min="1"
              type="number"
              @change="updateAmounts"
              @focus="core.selectInputContent"
            />
          </label>
        </div>

        <div class="amountPerUnit">
          <label>
            Amount per unit

            <AmountInput
              :amount="editableOperation.amountPerUnit"
              class="form-control"
              @change="updateAmounts"
            ></AmountInput>
          </label>
        </div>

        <div class="amount">
          <label>
            Total

            <input
              class="form-control"
              disabled
              readonly
              type="text"
              :value="amount"
            />
          </label>
        </div>

        <div class="comments">
          <textarea
            v-model="editableOperation.comments"
            class="form-control"
            rows="2"
          ></textarea>
        </div>

        <div class="confirmed">
          <div class="form-check">
            <input
              v-model="editableOperation.confirmed"
              class="form-check-input"
              type="checkbox"
            />
            <label class="form-check-label" for="confirmed"> Confirmed </label>
          </div>
        </div>
      </fieldset>
    </form>

    <Debug>
      {{ editableOperation }}
    </Debug>
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

.operation {
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "date date time"
    "account account account"
    "category category category"
    "type units amountPerUnit"
    "amount amount amount"
    "comments comments comments"
    "confirmed confirmed confirmed";
}

.date {
  grid-area: date;
}

.time {
  grid-area: time;
}

.account {
  grid-area: account;
}

.category {
  grid-area: category;
}

.type {
  grid-area: type;
}

.amount {
  grid-area: amount;
}

.amount label {
  align-items: center;
  display: flex;
  gap: 1rem;
}

.units {
  grid-area: units;
}

.amountPerUnit {
  grid-area: amountPerUnit;
}

.comments {
  grid-area: comments;
}

.confirmed {
  grid-area: confirmed;
}

.date input,
.time input,
.units input {
  text-align: center;
}

.amount input,
.amountPerUnit input {
  text-align: right;
}

label {
  width: 100%;
}
</style>
