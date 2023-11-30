<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useEditableResource } from "../../composables/use-editable-resource.js";
import { useRetrievedAt } from "../../composables/use-retrieved-at.js";
import { core } from "../../core/core.js";
import type { Operation } from "../../core/types/Operation.js";
import type { TrackedAsyncFunctionState } from "../../core/types/TrackedAsyncFunctionState";
import { useAccountsStore } from "../../modules/accounts/use-accounts-store";
import { useCategoriesStore } from "../../modules/categories/use-categories-store.js";
import { formatAsLocalisedCurrency } from "../../modules/common/utils/format-as-localised-currency.js";
import { makeEditableOperation } from "../../modules/operations/make-editable-operation.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import type { AccountSelectOption } from "../../types/AccountSelectOption";
import type { CategorySelectOption } from "../../types/CategorySelectOption.js";
import type { EditableOperation } from "../../types/EditableOperation.js";
import type { MakeEditableOperation } from "../../types/MakeEditableOperation.js";
import AmountInput from "../common/AmountInput.vue";
import Debug from "../common/Debug.vue";
import MyCombobox from "../common/my-combobox/MyCombobox.vue";

const accountsStore = useAccountsStore();

const categoriesStore = useCategoriesStore();

const operationsStore = useOperationsStore();

const route = useRoute();

const operationID = typeof route.params.id === "string" ? route.params.id : "";

const accountList: ComputedRef<AccountSelectOption[]> = computed(() =>
  accountsStore.accounts.data.map(({ accountID, name }) => ({
    accountID,
    name,
  })),
);

const categoryList: ComputedRef<CategorySelectOption[]> = computed(() =>
  categoriesStore.categories.data.map(({ categoryID, group, name }) => ({
    categoryID,
    group,
    name,
  })),
);

if (operationID) {
  operationsStore.getOperation({ operationID });
}

const retrievedAt = operationID
  ? useRetrievedAt<Operation>({
      collection: operationsStore.runningAsyncFunctions[operationID],
    })
  : "";

const editableOperation: EditableOperation = operationID
  ? useEditableResource<
      EditableOperation,
      MakeEditableOperation,
      TrackedAsyncFunctionState<Operation>
    >({
      makeEditableResource: makeEditableOperation,
      resource: operationsStore.runningAsyncFunctions[operationID],
    })
  : ({} as EditableOperation);

const amount = computed(() =>
  formatAsLocalisedCurrency({
    currency: "BRL",
    locales: "pt-BR",
    number: Math.abs(
      (editableOperation.amountPerUnit / 100) * editableOperation.unitCount,
    ),
  }),
);

const accountSelectFilter = ({
  options,
  search,
}: {
  options: Record<string, any>[];
  search: string;
}) => options.filter((option) => option.name.includes(search));

const categorySelectFilter = ({
  options,
  search,
}: {
  options: Record<string, any>[];
  search: string;
}) => options.filter((option) => option.name.includes(search));

const updateAccount = ({
  value: accountID,
}: {
  label: string;
  value: string | undefined;
}) => {
  editableOperation.accountID = accountID;

  if (accountID) {
    editableOperation.account = accountList.value.find(
      (account) => account.accountID === accountID,
    );
  } else {
    editableOperation.account = undefined;
  }
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

const updateCategory = ({
  value: categoryID,
}: {
  label: string;
  value: string | undefined;
}) => {
  editableOperation.categoryID = categoryID;

  if (categoryID) {
    editableOperation.category = categoryList.value.find(
      (category) => category.categoryID === categoryID,
    );
  } else {
    editableOperation.category = undefined;
  }
};

const save = () =>
  operationsStore.patchOperation({ operation: editableOperation });

const runningAsyncFunction = computed(
  () => operationsStore.runningAsyncFunctions[operationID],
);
</script>

<template>
  <div>
    <section class="header">
      <h1>Operation</h1>

      <div v-if="runningAsyncFunction?.error">
        {{ runningAsyncFunction?.error.message }}
      </div>

      <div v-if="runningAsyncFunction?.loading">Loading operation...</div>

      <div
        v-if="
          !runningAsyncFunction?.loading && runningAsyncFunction?.retrievedAt
        "
      >
        Retrieved {{ retrievedAt }} ago
      </div>
    </section>

    <form @submit.prevent="save">
      <fieldset :disabled="runningAsyncFunction?.loading">
        <div class="operation">
          <div class="date">
            <label class="visually-hidden" for="date">Date</label>

            <input
              id="date"
              v-model="editableOperation.atDate"
              class="form-control"
              type="date"
            />
          </div>

          <div class="time">
            <label class="visually-hidden" for="time">Time</label>

            <input
              id="time"
              v-model="editableOperation.atTime"
              class="form-control"
              type="time"
            />
          </div>

          <div class="account">
            <MyCombobox
              combobox-class="form-select"
              :current-selected-option="editableOperation.account"
              :filter="accountSelectFilter"
              label="name"
              listbox-class="border rounded"
              name="account"
              :options="accountList"
              value="accountID"
              @option-selected="updateAccount"
            >
              <template #option="{ option }: { option: AccountSelectOption }">
                <div class="account-select-option">
                  <b>{{ option.name }}</b>
                </div>
              </template>
            </MyCombobox>
          </div>

          <div class="category">
            <MyCombobox
              combobox-class="form-select"
              :current-selected-option="editableOperation.category"
              :filter="categorySelectFilter"
              label="name"
              listbox-class="border rounded"
              name="category"
              :options="categoryList"
              value="categoryID"
              @option-selected="updateCategory"
            >
              <template #option="{ option }: { option: CategorySelectOption }">
                <div class="category-select-option">
                  <b>{{ option.name }}</b>

                  <span class="small">{{ option.group.name }}</span>
                </div>
              </template>
            </MyCombobox>
          </div>

          <div class="type">
            <label>
              Type

              <select
                v-model="editableOperation.type"
                class="form-control"
                name="type"
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
                name="units"
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
                name="total"
                readonly
                type="text"
                :value="amount"
              />
            </label>
          </div>

          <div class="comments">
            <label class="visually-hidden" for="comments">Comments</label>

            <textarea
              id="comments"
              v-model="editableOperation.comments"
              class="form-control"
              name="comments"
              rows="2"
            ></textarea>
          </div>

          <div class="confirmed">
            <div class="form-check">
              <input
                id="confirmed"
                v-model="editableOperation.confirmed"
                class="form-check-input"
                name="confirmed"
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

.account-select-option {
  padding-block: 0.25rem;
}

.category-select-option {
  display: flex;
  flex-direction: column;
  padding-block: 0.25rem;
}
</style>
