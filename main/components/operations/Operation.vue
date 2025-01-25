<script lang="ts" setup>
import type { ComputedRef } from "vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useEditableResource } from "../../composables/use-editable-resource.js";
import { useSaveOperation } from "../../composables/use-save-operation";
import { core } from "../../core/core.js";
import { useAccountsStore } from "../../modules/accounts/use-accounts-store";
import { useCategoriesStore } from "../../modules/categories/use-categories-store.js";
import { formatAsLocalisedCurrency } from "../../modules/common/utils/format-as-localised-currency.js";
import { makeEditableOperation } from "../../modules/operations/make-editable-operation.js";
import { makeEmptyOperation } from "../../modules/operations/make-empty-operation";
import { useOperationsStore } from "../../modules/operations/use-operations-store.js";
import type { AccountSelectOption } from "../../types/AccountSelectOption";
import type { CategorySelectOption } from "../../types/CategorySelectOption.js";
import type { EditableOperation } from "../../types/EditableOperation.js";
import type { MakeEditableOperation } from "../../types/MakeEditableOperation.js";
import AmountInput from "../common/AmountInput.vue";
import Debug from "../common/Debug.vue";
import MyCombobox from "../common/my-combobox/MyCombobox.vue";
import PromiseState from "../common/PromiseState.vue";

const accountsStore = useAccountsStore();

const categoriesStore = useCategoriesStore();

const operationsStore = useOperationsStore();

const route = useRoute();

const router = useRouter();

const newOperation = ref(false);

const operationID = ref("");

const copyOperation = ref(false);

const copyOperationID = ref("");

if (typeof route.params.id === "string") {
  switch (route.params.id) {
    case "new":
      newOperation.value = true;

      break;

    case "copy":
      copyOperation.value = true;

      if (typeof route.query.operationID === "string") {
        copyOperationID.value = route.query.operationID;
      }

      break;

    default:
      operationID.value = route.params.id;
  }
}

if (operationID.value || copyOperationID.value) {
  operationsStore.getOperation({
    operationID: operationID.value || copyOperationID.value,
  });
}

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

const editableOperation: EditableOperation = useEditableResource<
  EditableOperation,
  MakeEditableOperation,
  any
>({
  makeEditableResource: makeEditableOperation,
  options: { copy: copyOperation.value },
  resource:
    operationID.value || copyOperationID.value
      ? operationsStore.promises[operationID.value || copyOperationID.value]
      : { value: makeEmptyOperation(), isFulfilled: true },
});

const amount = computed(() => {
  const newAmount =
    (editableOperation.amountPerUnit / 100) * editableOperation.unitCount;

  return Number.isNaN(newAmount)
    ? 0
    : formatAsLocalisedCurrency({
        currency: "BRL",
        locales: "pt-BR",
        number: Math.abs(
          (editableOperation.amountPerUnit / 100) * editableOperation.unitCount,
        ),
      });
});

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

const updateAt = () => {
  editableOperation.at = new Date(
    `${editableOperation.atDate} ${editableOperation.atTime}`,
  ).toISOString();
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

const submit = (payload: Event) => {
  if (payload instanceof SubmitEvent) {
    if (payload.submitter instanceof HTMLButtonElement) {
      switch (payload.submitter.name) {
        case "save":
          {
            const { saveOperation } = useSaveOperation({
              copyOperation,
              editableOperation,
              newOperation,
              operationID,
            });

            saveOperation(() => {
              setTimeout(() => {
                operationsStore.updateCachedOperations({
                  operationID: operationID.value,
                });

                router.back();
              }, 300);
            });
          }

          break;

        case "saveAndStay":
          {
            const { saveOperation } = useSaveOperation({
              copyOperation,
              editableOperation,
              newOperation,
              operationID,
            });

            saveOperation(() => {
              setTimeout(() => {
                operationsStore.updateCachedOperations({
                  operationID: operationID.value,
                });

                router.back();
              }, 300);
            });
          }

          break;

        case "copy":
          if (copyOperation.value === false) {
            copyOperation.value = true;
          }

          history.replaceState(
            {},
            "",
            `/operations/copy?operationID=${operationID.value}`,
          );

          break;

        case "delete":
          if (operationID.value) {
            operationsStore.deleteOperation({
              operationID: operationID.value,

              onFulfilled() {
                operationsStore.updateCachedOperations({
                  operationID: operationID.value,
                });

                router.back();
              },
            });
          }

          break;

        default:
          window.console.error("Unexpected Error: NO_SUCH_SUBMIT_HANDLER!", {
            name: payload.submitter.name,
          });

          window.alert("Unexpected Error: NO_SUCH_SUBMIT_HANDLER!");
      }
    }
  }
};

const onRefresh = () => {
  if (operationID.value) {
    operationsStore.getOperation({
      bypassLocalCache: true,
      operationID: operationID.value,
    });
  }
};

const promise = computed(
  () =>
    operationsStore.promises[operationID.value || copyOperationID.value] ??
    core.voidTrackedPromise,
);
</script>

<template>
  <div>
    <section class="header">
      <h1>Operation</h1>

      <PromiseState
        v-if="!copyOperation"
        :promise="promise"
        resource-name-plural="operation"
        resource-name-singular="operation"
        @refresh="onRefresh"
      ></PromiseState>
    </section>

    <form @submit.prevent="submit">
      <fieldset :disabled="promise.isPending">
        <div class="operation">
          <div class="date">
            <label class="visually-hidden" for="date">Date</label>

            <input
              id="date"
              v-model="editableOperation.atDate"
              class="form-control"
              required
              type="date"
              @change="updateAt"
            />
          </div>

          <div class="time">
            <label class="visually-hidden" for="time">Time</label>

            <input
              id="time"
              v-model="editableOperation.atTime"
              class="form-control"
              required
              type="time"
              @change="updateAt"
            />
          </div>

          <input v-model="editableOperation.at" type="hidden" />

          <div class="account">
            <MyCombobox
              combobox-class="form-select"
              :current-selected-option="editableOperation.account"
              :filter="accountSelectFilter"
              label="name"
              listbox-class="border rounded"
              name="account"
              :options="accountList"
              :required="true"
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
              :required="true"
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
                required
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
                required
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

        <div class="actions">
          <div class="secondary-actions">
            <button
              class="btn btn-outline-secondary"
              :disabled="copyOperation"
              name="copy"
              type="submit"
            >
              <svg class="bi" fill="currentColor" height="16" width="16">
                <use xlink:href="bootstrap-icons/bootstrap-icons.svg#copy" />
              </svg>

              Copy
            </button>

            <div class="btn-group dropup">
              <button
                aria-expanded="false"
                class="btn btn-outline-warning dropdown-toggle"
                data-bs-toggle="dropdown"
                :disabled="copyOperation"
                type="button"
              >
                <svg class="bi" fill="currentColor" height="16" width="16">
                  <use xlink:href="bootstrap-icons/bootstrap-icons.svg#trash" />
                </svg>
              </button>

              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item" name="delete" type="submit">
                    <svg class="bi" fill="currentColor" height="16" width="16">
                      <use
                        xlink:href="bootstrap-icons/bootstrap-icons.svg#trash"
                      />
                    </svg>

                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="primary-actions">
            <div v-if="copyOperation" class="btn-group dropup">
              <button class="btn btn-primary" name="save" type="submit">
                Save
              </button>

              <button
                aria-expanded="false"
                class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                type="button"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>

              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    name="saveAndStay"
                    type="submit"
                  >
                    Save & Stay
                  </button>
                </li>
              </ul>
            </div>

            <div v-if="!copyOperation" class="btn-group dropup">
              <button class="btn btn-warning" name="save" type="submit">
                Update
              </button>

              <button
                aria-expanded="false"
                class="btn btn-warning dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                type="button"
              >
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>

              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    name="saveAndStay"
                    type="submit"
                  >
                    Update & Stay
                  </button>
                </li>
              </ul>
            </div>
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

.account-select-option {
  padding-block: 0.25rem;
}

.category-select-option {
  display: flex;
  flex-direction: column;
  padding-block: 0.25rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.primary-actions {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}

.secondary-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
