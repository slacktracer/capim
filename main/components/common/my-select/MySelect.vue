<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, onMounted, ref, unref } from "vue";

import { boot } from "./boot.js";

// import { keydownEventHandlers } from "../select/keydown-event-handler.js";
// import { toggle } from "../select/toggle.js";
//
// const emit = defineEmits<{
//   optionSelected: [selectedOption: any | null];
// }>();
//
const props = defineProps<{
  filter: (input: {
    options: Record<string, any>[];
    search: string;
  }) => Record<string, any>[];
  label: string;
  options: Record<string, any>[];
  property: string;
  selectedOption: Record<string, any>;
}>();
//
const filteredOptions: Record<string, any> = computed(() =>
  props.filter({ options: props.options, search: unref(search) }),
);
//
const showOptions = ref(true);
//
const _selectedOption: Ref<Record<string, any> | null> = ref(null);
//
const search: Ref<string> = ref("");

const mySelect = ref();

onMounted(() => {
  const { value: mySelectElement } = mySelect;

  boot({ mySelectElement });
});

// const handleClickEvent = () => {
//   setTimeout(async () => {
//     emit("optionSelected", toRaw(unref(_selectedOption)));
//
//     await toggle({ showOptions });
//     // This was my last resort...
//     // Hopefully I wil be able to "fix" it someday...
//   }, 10);
// };
//
// const handleKeydownEvents = (event: KeyboardEvent) => {
//   if (event.target) {
//     if (event.code === "Enter") {
//       emit("optionSelected", toRaw(unref(_selectedOption)));
//     }
//
//     if (event.code === "Tab" && event.shiftKey) {
//       event.preventDefault();
//       event.stopPropagation();
//
//       const search = document.querySelector(".search") as HTMLElement;
//
//       if (search) {
//         search.focus();
//       }
//
//       return;
//     }
//
//     keydownEventHandlers[event.code as keyof typeof keydownEventHandlers]?.({
//       event,
//     });
//   }
// };

const submit = () => {
  // toggle({ showOptions });
};
</script>

<template>
  <div ref="mySelect" class="my-select">
    <form @submit.prevent="submit">
      <button
        class="form-select toggle"
        data-select-role="select"
        type="submit"
      >
        {{ props.selectedOption?.[props.label] ?? "Select category" }}
      </button>
    </form>

    <div v-if="showOptions" class="border rounded select" tabindex="0">
      <div style="padding: 1rem">
        <input
          v-model="search"
          class="form-control search"
          data-select-role="search"
          placeholder="Search"
          type="text"
        />
      </div>

      [[{{ _selectedOption?.name }}]]

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
            tabindex="0"
          >
            <input
              v-model="_selectedOption"
              class="option-input"
              data-select-role="option"
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

.option:focus,
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
