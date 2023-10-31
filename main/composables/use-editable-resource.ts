import { reactive, watch } from "vue";

import { core } from "../core/core.js";
import type { AsyncDataState } from "../types/AsyncDataState.js";

export const useEditableResource = <
  EditableResource,
  MakeEditableResource extends (...args: any[]) => any,
  Resource extends AsyncDataState<unknown>,
>({
  makeEditableResource,
  resource,
}: {
  makeEditableResource: MakeEditableResource;
  resource: Resource;
}) => {
  const editableResource = reactive({});

  watch(
    () => resource.ready,
    (currentValue, previousValue) => {
      if (core.didSwitchTo({ currentValue, previousValue, to: true })) {
        Object.assign(
          editableResource,
          makeEditableResource({ data: resource.data }),
        );
      }
    },
  );

  return editableResource as EditableResource;
};
