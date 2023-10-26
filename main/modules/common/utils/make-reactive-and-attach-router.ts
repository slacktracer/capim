import { markRaw, reactive } from "vue";
import type { Router } from "vue-router";

export const makeReactiveAndAttachRouter = <State>({
  object,
  router,
}: {
  object: State;
  router: Router;
}) => Object.assign(reactive(object as object), markRaw({ router })) as State;
