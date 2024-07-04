import { reactive, watch } from "vue";

import { core } from "../core/core.js";
import type { TrackedPromise } from "../core/types/TrackedPromise";

export const useEditableResource = <
  EditableResource,
  MakeEditableResource extends (...args: any[]) => any,
  Resource extends TrackedPromise<unknown, any>,
>({
  makeEditableResource,
  options,
  resource,
}: {
  makeEditableResource: MakeEditableResource;
  options?: { [key: string]: unknown };
  resource: Resource;
}) => {
  const editableResource = reactive({});

  if (resource.isFulfilled) {
    Object.assign(
      editableResource,
      makeEditableResource({ data: resource.value, options }),
    );
  }

  watch(
    () => resource.isFulfilled,
    (currentValue, previousValue) => {
      if (core.didSwitchTo({ currentValue, previousValue, to: true })) {
        Object.assign(
          editableResource,
          makeEditableResource({ data: resource.value, options }),
        );
      }
    },
  );

  return editableResource as EditableResource;
};
