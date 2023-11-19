<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

import { boot } from "./my-combobox-engine/boot.js";
import { makeOutsideInteractionHandler } from "./my-combobox-engine/make-outside-interaction-handler.js";
import { goToListItem } from "./my-combobox-engine/option-key-down-event-handlers/option-list-traversing/go-to-list-item";
import type { MakeOutsideInteractionHandler } from "./my-combobox-engine/types/MakeOutsideInteractionHandler.js";
import type { OnOptionSelected } from "./my-combobox-engine/types/OnOptionSelected.js";

const emit = defineEmits<{
  optionSelected: [{ label: string; value: string | undefined }];
}>();

const props = defineProps<{
  currentSelectedOption: Record<string, any> | undefined;
  filter?: (input: {
    options: Record<string, any>[];
    search: string;
  }) => Record<string, any>[];
  label: string;
  options: Record<string, any>[];
  property: string;
}>();

let count = 0;

let previousCount = 0;

let previousSearchValue = "";

const filteredOptions: Record<string, any> = computed(() => {
  if (search.value === "") {
    previousSearchValue = "";
  }

  let updatedFilteredOptions;

  if (count === previousCount) {
    updatedFilteredOptions = props.filter
      ? props.filter({ options: props.options, search: search.value })
      : props.options;

    previousSearchValue = search.value;
  } else {
    updatedFilteredOptions = props.filter
      ? props.filter({ options: props.options, search: previousSearchValue })
      : props.options;
  }

  previousCount = count;

  return updatedFilteredOptions;
});

const showOptions = ref(false);

const search: Ref<string> = ref("");

const myCombobox = ref();

let shutdown: ReturnType<typeof boot>;

let outsideInteractionHandler: ReturnType<MakeOutsideInteractionHandler>;

onMounted(() => {
  const { value: comboboxContainer } = myCombobox;

  shutdown = boot({
    comboboxContainer,
    onOptionSelected,
    toggleCombobox,
  });

  outsideInteractionHandler = makeOutsideInteractionHandler({
    comboboxContainer,
    toggleCombobox,
  });
});

onUnmounted(() => {
  shutdown?.();
});

watch(
  () => props.currentSelectedOption,
  (current) => (search.value = current?.[props.label]),
);

const toggleCombobox = async () => {
  showOptions.value = !showOptions.value;

  await nextTick();

  if (showOptions.value) {
    window.document.body.addEventListener("click", outsideInteractionHandler);

    if (props.currentSelectedOption) {
      const { value: comboboxContainer } = myCombobox;

      if (comboboxContainer instanceof HTMLElement) {
        const listItem = comboboxContainer.querySelector(
          `#option-${props.currentSelectedOption[props.property]}`,
        );

        if (listItem instanceof HTMLLIElement) {
          goToListItem({ listItem });
        }
      }
    }
  } else {
    window.document.body.removeEventListener(
      "click",
      outsideInteractionHandler,
    );
  }
};

const onOptionSelected: OnOptionSelected = ({ label, value }) => {
  count += 1;

  search.value = label;

  emit("optionSelected", { label, value });
};
</script>

<template>
  <div
    ref="myCombobox"
    class="my-combobox"
    data-select-role="select"
    @click.prevent.stop
  >
    <input
      v-model="search"
      :aria-expanded="showOptions"
      class="form-control"
      role="combobox"
      type="search"
    />

    <ul v-show="showOptions" class="border rounded" role="listbox">
      <li
        v-for="option in filteredOptions"
        :id="`option-${option[props.property]}`"
        :key="option[props.property]"
        :data-label="option[props.label]"
        :data-value="option[props.property]"
        role="option"
        tabindex="0"
      >
        <span>
          <slot name="option" :option="option"></slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.my-combobox {
  position: relative;
}

[role="listbox"] {
  background: white;
  list-style: none;
  margin-block-end: 0;
  max-height: 12rem;
  overflow-y: scroll;
  padding-inline-start: 0;
  position: absolute;
  top: calc(38px + 0.5rem);
  width: 100%;
}

[role="option"] {
  align-items: center;
  display: flex;
  outline: none;
  padding-inline: 0.75rem;
  width: 100%;
}

[role="option"]:hover {
  background: lightgray;
}

[role="option"].aria-selected {
  background: #333333;
  color: whitesmoke;
}

[role="option"] span {
  pointer-events: none;
}
</style>
