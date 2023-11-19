import type { Ref } from "vue";

import type { ToggleCombobox } from "./ToggleCombobox";

export type MakeToggleCombobox = (input: {
  comboboxContainer: HTMLElement;
  currentSelectedOption: Ref<Record<string, any> | undefined>;
  label: Ref<string>;
  name: Ref<string>;
  search: Ref<string>;
  showOptions: Ref<boolean>;
  value: Ref<string>;
}) => ToggleCombobox;
