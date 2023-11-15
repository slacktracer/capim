<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useEditableResource } from "../../composables/use-editable-resource.js";
import { useRetrievedAt } from "../../composables/use-retrieved-at.js";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import { useCategoriesStore } from "../../modules/categories/use-categories-store.js";
import { formatAsLocalisedCurrency } from "../../modules/common/utils/format-as-localised-currency.js";
import { makeEditableOperation } from "../../modules/operations/make-editable-operation.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import type { AsyncDataState } from "../../types/AsyncDataState.js";
import type { CategorySelectOption } from "../../types/CategorySelectOption.js";
import type { EditableOperation } from "../../types/EditableOperation.js";
import type { MakeEditableOperation } from "../../types/MakeEditableOperation.js";
import type { UseRetrievedAt } from "../../types/UseRetrievedAt.js";
import AmountInput from "../common/AmountInput.vue";
import Debug from "../common/Debug.vue";
import MySelect from "../common/my-select/MySelect.vue";
import AccountSelector from "./AccountSelect.vue";

const categoriesStore = useCategoriesStore();

const categoryList: ComputedRef<CategorySelectOption[]> = computed(() =>
  categoriesStore.categories.data.map(({ categoryID, group, name }) => ({
    categoryID,
    group,
    name,
  })),
);

const route = useRoute();

const operationsStore = useOperationsStore();

if (typeof route.params.id === "string") {
  operationsStore.getOperation({ operationID: route.params.id });
}

const retrievedAt = useRetrievedAt<UseRetrievedAt<Operation>>({
  collection: operationsStore.operation,
});

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

const save = () =>
  window.alert("Saved!\nNah, just kidding. Not saved at all...");

const updateAccount = (accountID: string) => {
  editableOperation.accountID = accountID;
};

const categorySelectFilter = ({
  options,
  search,
}: {
  // I wanted this:
  // options: CategorySelectOption[];
  // But that gave me this:
  // Type '({ options, search, }: { options: CategorySelectOption[]; search: string; }) => CategorySelectOption[]' is not assignable to type '(input: { options: Record<string, any>[]; search: string; }) => Record<string, any>[]'.
  // How do I make the prop "generic" in some way...?
  options: Record<string, any>[];
  search: string;
}) => options.filter((option) => option.name.includes(search));

const updateCategory = (category: CategorySelectOption | undefined) => {
  if (category) {
    editableOperation.categoryID = category.categoryID;
    editableOperation.category = category;
  } else {
    editableOperation.categoryID = undefined;
    editableOperation.category = undefined;
  }
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

    <form @submit.prevent="save">
      <fieldset :disabled="operationsStore.operation.loading">
        <div class="operation">
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
            <AccountSelector
              class="form-select"
              :selected-account="editableOperation.accountID"
              @account-selected="updateAccount"
            ></AccountSelector>
          </div>

          <div class="category">
            <MySelect
              :current-selected-option="editableOperation.category"
              :filter="categorySelectFilter"
              label="name"
              :options="categoryList"
              property="categoryID"
              @option-selected="updateCategory"
            >
              <template #no-match>
                No category matches the search term
              </template>

              <template #option="{ option }">
                <div class="category-select-option">
                  <b>{{ option.name }}</b>

                  <span class="small">{{ option.group.name }}</span>
                </div>
              </template>
            </MySelect>
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
              <label class="form-check-label" for="confirmed">
                Confirmed
              </label>
            </div>
          </div>
        </div>

        <div style="padding: 1rem; text-align: right">
          <button class="btn btn-primary" type="submit">Save</button>
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

.category-select-option {
  display: flex;
  flex-direction: column;
  padding-block-end: 0.5rem;
}
</style>
