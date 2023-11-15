<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, onMounted, ref, toRaw, unref } from "vue";

import { toggle } from "../select/toggle.js";
import { boot } from "./boot.js";

const emit = defineEmits<{
  optionSelected: [selectedOption: any | null];
}>();

const props = defineProps<{
  currentSelectedOption: Record<string, any> | undefined;
  filter: (input: {
    options: Record<string, any>[];
    search: string;
  }) => Record<string, any>[];
  label: string;
  options: Record<string, any>[];
  property: string;
}>();

const filteredOptions: Record<string, any> = computed(() =>
  props.filter({ options: props.options, search: unref(search) }),
);

const showOptions = ref(false);

const selectedOption: Ref<Record<string, any> | null> = ref(null);

const search: Ref<string> = ref("");

const mySelect = ref();

const onOptionSelected = () =>
  emit("optionSelected", toRaw(unref(selectedOption)));

onMounted(() => {
  const { value: mySelectElement } = mySelect;

  boot({ mySelectElement, onOptionSelected });
});

const submit = () => {
  toggle({ showOptions });
};
</script>

<template>
  <div ref="mySelect" class="my-select" data-select-role="select">
    <form @submit.prevent="submit">
      <button class="form-select toggle" data-select-role="input" type="submit">
        {{ props.currentSelectedOption?.[props.label] ?? "Select category" }}
      </button>
    </form>

    <div v-if="showOptions" class="border rounded select">
      <div>
        <input
          v-model="search"
          class="form-control search"
          data-select-role="search"
          placeholder="Search"
          type="search"
        />
      </div>

      <ul class="options" data-select-role="options">
        <li
          v-for="option in filteredOptions"
          :id="`list-item-${option[props.property]}`"
          :key="option[props.property]"
          role="option"
        >
          <label
            :id="`option-${option[props.property]}`"
            class="option"
            data-select-role="option-label"
          >
            <input
              v-model="selectedOption"
              class="option-input"
              data-select-role="option-input"
              name="options"
              type="radio"
              :value="option"
              @click.stop
            />

            <span class="option-content">
              <slot :option="option"></slot>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.my-select {
  position: relative;
}

.toggle {
  text-align: left;
  width: 100%;
}

.select {
  background: white;
  overflow-y: hidden;
  position: absolute;
  top: 38px;
  width: 100%;
}

div:has(> input.search) {
  padding: 1rem;
}

.options {
  list-style: none;
  max-height: 12rem;
  overflow-y: scroll;
  padding-inline-start: 0;
}

.options li {
  margin-block-end: 0.5rem;
}

.option {
  align-items: center;
  display: flex;
  outline: none;
  padding-inline: 1rem;
  width: 100%;
}

.option:focus-within {
  background: hsla(303, 100%, 50%, 0.5);
}

.option-input {
  height: 0;
  width: 0;
}

.option-content {
  display: flex;
  flex-direction: column;
}
</style>
