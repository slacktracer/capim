<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

import { makeToggleMultiCombobox } from "./make-toggle-multi-combobox.js";
import { boot } from "./my-multi-combobox-engine/boot.js";
import type { EmitOptionAddEvent } from "./my-multi-combobox-engine/types/EmitOptionAddEvent.js";

const emit = defineEmits<{
  optionAdd: [{ label: string; value: string }];
  optionRemove: [{ label: string; value: string }];
}>();

const props = defineProps<{
  comboboxClass?: string;
  currentSelectedOptions: { label: string; value: string }[];
  filter: (input: {
    options: Record<string, any>[];
    search: string;
  }) => Record<string, any>[];
  label: string;
  listboxClass?: string;
  name: string;
  options: Record<string, any>[];
  placeholder?: string;
  value: string;
}>();

let shutdown: ReturnType<typeof boot>;

const search = ref("");

const showOptions = ref(false);

const myMultiCombobox = ref();

const emitOptionAddEvent: EmitOptionAddEvent = ({ label, value }) => {
  search.value = "";

  emit("optionAdd", { label, value });
};

const onBackspace = () => {
  const lastSelectedOption =
    props.currentSelectedOptions[props.currentSelectedOptions.length - 1];

  if (search.value === "" && lastSelectedOption) {
    emit("optionRemove", lastSelectedOption);
  }
};

onMounted(() => {
  const { value: comboboxContainer } = myMultiCombobox;

  const toggleCombobox = makeToggleMultiCombobox({
    comboboxContainer,
    showOptions,
  });

  shutdown = boot({
    comboboxContainer,
    emitOptionAddEvent,
    toggleCombobox,
  });
});

onUnmounted(() => {
  shutdown?.();
});

const unselectedOptions = computed(() =>
  props.options.filter(
    (option) =>
      !props.currentSelectedOptions.some(
        (selectedOption) => selectedOption.value === option[props.value],
      ),
  ),
);

const filteredOptions: Record<string, any> = computed(() =>
  props.filter({ options: unselectedOptions.value, search: search.value }),
);
</script>

<template>
  <div ref="myMultiCombobox" class="my-multi-combobox">
    <span
      v-for="option in props.currentSelectedOptions"
      :key="option.value"
      class="my-multi-combobox-chip"
    >
      {{ option.label }}

      <button
        :aria-label="`Remove ${option.label}`"
        type="button"
        @click="emit('optionRemove', option)"
      >
        ×
      </button>
    </span>

    <input
      v-model="search"
      aria-autocomplete="list"
      :aria-controls="`${props.name}-listbox`"
      :aria-expanded="showOptions"
      :aria-label="props.name"
      autocomplete="off"
      :class="props.comboboxClass ? `${props.comboboxClass}` : ''"
      :name="props.name"
      :placeholder="props.placeholder ?? props.name"
      role="combobox"
      type="search"
      @keydown.backspace="onBackspace"
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
          <slot name="option" :option="option">{{ option[props.label] }}</slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.my-multi-combobox {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  position: relative;
}

.my-multi-combobox-chip {
  align-items: center;
  display: inline-flex;
  gap: 0.35rem;
}

.my-multi-combobox-chip button {
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

[role="listbox"] {
  background: white;
  list-style: none;
  margin-block-end: 0;
  max-height: 12rem;
  overflow-y: scroll;
  padding-inline-start: 0;
  position: absolute;
  top: calc(100% + 0.5rem);
  width: 100%;
  z-index: 2;
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
