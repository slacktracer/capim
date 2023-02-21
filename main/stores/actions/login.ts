import { Ref } from "vue";

import { navigateTo } from "#app";

import * as main from "../../core/main.js";
import { State } from "../../core/main.js";
import { Actions } from "../../types/Actions.js";

export const login = async (
  _state: State,
  { boot }: Actions,
  {
    password,
    username,
  }: {
    password: Ref<string>;
    username: Ref<string>;
  },
) => {
  await main.login({
    password: password.value,
    username: username.value,
  });

  navigateTo("/");

  await boot();
};
