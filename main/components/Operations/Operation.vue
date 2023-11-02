<script lang="ts" setup>
import { computed } from "vue";
import VueMultiselect from "vue-multiselect";
import { useRoute } from "vue-router";

import { useEditableResource } from "../../composables/use-editable-resource.js";
import { useRetrievedAt } from "../../composables/use-retrieved-at.js";
import type { Operation } from "../../core/types/Operation.js";
import { useAccountsStore } from "../../modules/accounts/use-accounts-store.js";
import { useCategoriesStore } from "../../modules/categories/use-categories-store.js";
import { makeEditableOperation } from "../../modules/operations/make-editable-operation.js";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import type { AsyncDataState } from "../../types/AsyncDataState.js";
import type { EditableOperation } from "../../types/EditableOperation.js";
import type { MakeEditableOperation } from "../../types/MakeEditableOperation.js";
import type { UseRetrievedAt } from "../../types/UseRetrievedAt.js";
import AmountInput from "../common/AmountInput.vue";
import Debug from "../common/Debug.vue";

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

const accountList = computed(() =>
  accountsStore.accounts.data.map(({ accountID, name }) => ({
    accountID,
    name,
  })),
);

const categoryList = computed(() =>
  categoriesStore.categories.data.map(({ categoryID, name }) => ({
    categoryID,
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

const onAmountChange = (newValue: number) =>
  (editableOperation.amount =
    editableOperation.type === "Expense" ? newValue * -1 : newValue);
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

    <section v-if="operationsStore.operation.ready === true" class="operation">
      <form>
        <fieldset>
          <div class="at mb-3">
            <input
              id="atDate"
              v-model="editableOperation.atDate"
              class="form-control"
              type="date"
            />

            <input
              id="atTime"
              v-model="editableOperation.atTime"
              class="form-control"
              type="time"
            />
          </div>

          <div class="mb-3">
            <VueMultiselect
              v-model="editableOperation.account"
              label="name"
              :options="accountList"
            ></VueMultiselect>
          </div>

          <div class="mb-3">
            <VueMultiselect
              v-model="editableOperation.category"
              label="name"
              :options="categoryList"
            ></VueMultiselect>
          </div>

          <div class="amount mb-3">
            <label>
              Type

              <select
                id="type"
                v-model="editableOperation.type"
                class="form-control"
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </label>

            <label>
              Units

              <input
                id="unitCount"
                v-model="editableOperation.unitCount"
                class="form-control"
                max="999"
                min="0"
                type="number"
              />
            </label>

            <label>
              Amount

              <AmountInput
                id="amount"
                :amount="editableOperation.amount"
                class="form-control"
                @change="onAmountChange"
              ></AmountInput>
            </label>
          </div>

          <div class="mb-3">
            <textarea
              id="comments"
              v-model="editableOperation.comments"
              class="form-control"
              rows="3"
            ></textarea>
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input
                id="confirmed"
                v-model="editableOperation.confirmed"
                class="form-check-input"
                type="checkbox"
              />
              <label class="form-check-label" for="confirmed">
                Confirmed
              </label>
            </div>
          </div>
        </fieldset>
      </form>
    </section>

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

.at {
  display: flex;
  gap: 1rem;
}

.at input {
  text-align: center;
}

.amount {
  display: flex;
  gap: 1rem;
}

.amount #type {
  width: min-content;
}

.amount #unitCount {
  flex-basis: 6.75em;
  width: min-content;
  text-align: center;
}

.amount #amount {
  text-align: right;
}
</style>

<style>
/* TODO
    Learn how to restyle most (maybe most) of VueMultiselect
    This is a quite nitpicking start.
*/
.multiselect__tags {
  min-height: 38px;
}
</style>
