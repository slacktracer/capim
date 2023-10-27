import { navigateTo } from "#app";

import { core } from "../../core/core.js";
import { boot } from "../boot/boot.js";

export const login = async ({
  password,
  username,
}: {
  password: string;
  username: string;
}) => {
  await core.login({
    password,
    username,
  });

  navigateTo("/");

  await boot();
};
