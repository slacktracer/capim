<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, nextTick, onMounted, onUnmounted, ref, unref } from "vue";

import { boot } from "./my-select-engine/boot.js";
import { makeOutsideInteractionHandler } from "./my-select-engine/make-outside-interaction-handler.js";
import { roles } from "./my-select-engine/roles.js";
import type { MakeOutsideInteractionHandler } from "./my-select-engine/types/MakeOutsideInteractionHandler.js";
import type { OnOptionSelected } from "./my-select-engine/types/OnOptionSelected.js";

const emit = defineEmits<{
  optionSelected: [{ selectedOption: string | undefined }];
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

const filteredOptions: Record<string, any> = computed(() =>
  props.filter
    ? props.filter({ options: props.options, search: unref(search) })
    : props.options,
);

const showOptions = ref(false);

const search: Ref<string> = ref("");

const mySelect = ref();

let shutdown: ReturnType<typeof boot>;

let outsideInteractionHandler: ReturnType<MakeOutsideInteractionHandler>;

onMounted(() => {
  const { value: mySelectElement } = mySelect;

  shutdown = boot({
    filterable: props.filter !== undefined,
    mySelectElement,
    onOptionSelected,
  });

  outsideInteractionHandler = makeOutsideInteractionHandler({
    container: mySelectElement,
  });
});

onUnmounted(() => {
  shutdown();
});

const toggle = async () => {
  showOptions.value = !showOptions.value;

  await nextTick();

  const { value: mySelectElement } = mySelect;

  if (showOptions.value) {
    const currentSelectedOptionID =
      props.currentSelectedOption?.[props.property];

    const currentSelectedOptionLabel = mySelectElement.querySelector(
      `label#option-${currentSelectedOptionID}`,
    );

    window.document.body.addEventListener("click", outsideInteractionHandler);

    if (currentSelectedOptionLabel) {
      // I will put this in a function tomorrow...
      // I was not able to make scrollIntoView play ball...
      currentSelectedOptionLabel.parentNode.parentNode.scrollTop =
        currentSelectedOptionLabel.offsetTop -
        currentSelectedOptionLabel.parentNode.parentNode.clientHeight +
        currentSelectedOptionLabel.clientHeight;

      currentSelectedOptionLabel.focus();
    }
  } else {
    const toggle = mySelectElement.querySelector(
      `[data-select-role=${roles.input}]`,
    );

    if (toggle) {
      toggle.focus();
    }

    window.document.body.removeEventListener(
      "click",
      outsideInteractionHandler,
    );
  }
};

const onOptionSelected: OnOptionSelected = ({ selectedOption } = {}) =>
  emit("optionSelected", { selectedOption });
</script>

<template>
  <div
    ref="mySelect"
    class="my-select"
    data-select-role="select"
    @click.prevent
  >
    <button
      :aria-expanded="showOptions"
      aria-haspopup="listbox"
      class="form-select toggle"
      data-select-role="input"
      role="combobox"
      type="submit"
      @click="toggle"
    >
      {{ props.currentSelectedOption?.[props.label] ?? "Select category" }}
    </button>

    <div v-show="showOptions" class="border rounded select">
      <div v-if="props.filter">
        <input
          v-model="search"
          class="form-control search"
          data-select-role="search"
          placeholder="Search"
          type="search"
        />
      </div>

      <ul class="options" data-select-role="listbox" role="listbox">
        <li v-if="filteredOptions.length === 0" role="option">
          <label class="option">
            <slot name="no-match">No option matches the search term</slot>

            <input
              class="option-input"
              data-select-role="option-input"
              name="options"
              type="radio"
              :value="undefined"
            />
          </label>
        </li>

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
              class="option-input"
              data-select-role="option-input"
              name="options"
              type="radio"
              :value="option[props.property]"
            />

            <span class="option-label">
              <slot name="option" :option="option"></slot>
            </span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.my-select {
  --internal-padding: 0.75rem;
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
  padding: var(--internal-padding);
}

.options {
  list-style: none;
  margin-block-end: 0;
  max-height: 12rem;
  overflow-y: scroll;
  padding-inline-start: 0;
  position: relative;
}

.option {
  align-items: center;
  display: flex;
  outline: none;
  padding-inline: var(--internal-padding);
  width: 100%;
}

.option:focus-within,
.option:hover {
  background: hsla(303, 100%, 50%, 0.5);
}

.option-input {
  height: 0;
  width: 0;
}

.option-label {
  pointer-events: none;
}
</style>
