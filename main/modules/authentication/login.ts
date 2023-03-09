import * as main from "../../core/main.js";
import { boot } from "../boot/boot.js";

export const login = async ({
  password,
  username,
}: {
  password: string;
  username: string;
}) => {
  await main.login({
    password,
    username,
  });

  await boot();
};
