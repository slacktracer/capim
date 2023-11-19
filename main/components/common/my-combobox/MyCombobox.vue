<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

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
  filter: (input: {
    options: Record<string, any>[];
    search: string;
  }) => Record<string, any>[];
  label: string;
  name: string;
  options: Record<string, any>[];
  value: string;
}>();

let count = 0;

let outsideInteractionHandler: ReturnType<MakeOutsideInteractionHandler>;

let previousCount = 0;

let previousSearchValue = "";

let shutdown: ReturnType<typeof boot>;

const search: Ref<string> = ref("");

const showOptions = ref(false);

const myCombobox = ref();

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
  (currentSelectedOption) => {
    if (currentSelectedOption) {
      search.value = currentSelectedOption[props.label];
    }
  },
);

const filteredOptions: Record<string, any> = computed(() => {
  if (search.value === "") {
    previousSearchValue = "";
  }

  let updatedFilteredOptions;

  if (count === previousCount) {
    updatedFilteredOptions = props.filter({
      options: props.options,
      search: search.value,
    });

    previousSearchValue = search.value;
  } else {
    updatedFilteredOptions = props.filter({
      options: props.options,
      search: previousSearchValue,
    });
  }

  previousCount = count;

  return updatedFilteredOptions;
});

const toggleCombobox = () => {
  showOptions.value = !showOptions.value;

  if (showOptions.value) {
    window.document.body.addEventListener("click", outsideInteractionHandler);

    if (props.currentSelectedOption) {
      const { value: comboboxContainer } = myCombobox;

      if (comboboxContainer instanceof HTMLElement) {
        const listItem = comboboxContainer.querySelector(
          `#${props.name}-${props.currentSelectedOption[props.value]}`,
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

    if (props.currentSelectedOption) {
      search.value = props.currentSelectedOption[props.label];
    }
  }
};

const onOptionSelected: OnOptionSelected = ({ label, value }) => {
  count += 1;

  search.value = label;

  emit("optionSelected", { label, value });
};

const capitalise = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
</script>

<template>
  <div ref="myCombobox" class="my-combobox" @click.prevent.stop>
    <input
      v-model="search"
      aria-autocomplete="list"
      :aria-controls="`${props.name}-listbox`"
      :aria-expanded="showOptions"
      :aria-label="capitalise(props.name)"
      autocomplete="off"
      class="form-select"
      :name="props.name"
      :placeholder="capitalise(props.name)"
      role="combobox"
      type="search"
    />

    <ul
      v-show="showOptions"
      :id="`${props.name}-listbox`"
      class="border rounded"
      role="listbox"
    >
      <li
        v-for="option in filteredOptions"
        :id="`${props.name}-${option[props.value]}`"
        :key="option[props.value]"
        :data-label="option[props.label]"
        :data-value="option[props.value]"
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
  z-index: 1;
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
