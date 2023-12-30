<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, onMounted, onUnmounted, ref, toRef, watch } from "vue";

import { makeToggleCombobox } from "./make-toggle-combobox.js";
import { boot } from "./my-combobox-engine/boot.js";
import type { OnOptionSelected } from "./my-combobox-engine/types/OnOptionSelected.js";
import { capitalise } from "./my-combobox-engine/utils/capitalise.js";

const emit = defineEmits<{
  optionSelected: [{ label: string; value: string | undefined }];
}>();

const props = defineProps<{
  comboboxClass?: string;
  currentSelectedOption: Record<string, any> | undefined;
  filter: (input: {
    options: Record<string, any>[];
    search: string;
  }) => Record<string, any>[];
  label: string;
  listboxClass?: string;
  name: string;
  options: Record<string, any>[];
  required?: boolean;
  value: string;
}>();

let count = 0;

let previousCount = 0;

let previousSearchValue = "";

let shutdown: ReturnType<typeof boot>;

const search: Ref<string> = ref("");

const showOptions = ref(false);

const myCombobox = ref();

onMounted(() => {
  const { value: comboboxContainer } = myCombobox;

  const currentSelectedOption = toRef(() => props.currentSelectedOption);
  const label = toRef(() => props.label);
  const name = toRef(() => props.name);
  const value = toRef(() => props.value);

  const toggleCombobox = makeToggleCombobox({
    comboboxContainer,
    currentSelectedOption,
    label,
    name,
    search,
    showOptions,
    value,
  });

  shutdown = boot({
    comboboxContainer,
    onOptionSelected,
    toggleCombobox,
  });

  const [combobox] = comboboxContainer.children;

  if (combobox instanceof HTMLInputElement) {
    comboboxContainer.style.setProperty(
      "--combobox-height",
      `${combobox.offsetHeight}px`,
    );
  }
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
  { immediate: true },
);

const filteredOptions: Record<string, any> = computed(() => {
  if (search.value === "") {
    previousSearchValue = "";
  }

  const searchValue =
    count === previousCount ? search.value : previousSearchValue;

  const updatedFilteredOptions = props.filter({
    options: props.options,
    search: searchValue,
  });

  previousCount = count;

  return updatedFilteredOptions;
});

const onOptionSelected: OnOptionSelected = ({ label, value }) => {
  count += 1;

  search.value = label;

  emit("optionSelected", { label, value });
};
</script>

<template>
  <div ref="myCombobox" class="my-combobox">
    <input
      v-model="search"
      aria-autocomplete="list"
      :aria-controls="`${props.name}-listbox`"
      :aria-expanded="showOptions"
      :aria-label="capitalise(props.name)"
      autocomplete="off"
      :class="props.comboboxClass ? `${props.comboboxClass}` : ''"
      :name="props.name"
      :placeholder="capitalise(props.name)"
      :required="props.required"
      role="combobox"
      type="search"
    />

    <ul
      v-show="showOptions"
      :id="`${props.name}-listbox`"
      :class="props.listboxClass ? `${props.listboxClass}` : ''"
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
  --combobox-height: 1rem;
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
  top: calc(var(--combobox-height) + 0.5rem);
  width: 100%;
  z-index: 1;
}

[role="option"] {
  align-items: center;
  display: flex;
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

[role="option"] > span {
  pointer-events: none;
}
</style>
