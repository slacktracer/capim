import { post } from "./http/post.js";
import { storage } from "./storage.js";

export const login = async ({
  password,
  username,
}: {
  password: string;
  username: string;
}) => {
  const user = await post("authentication/login", {
    json: {
      password,
      username,
    },
  }).json();

  storage.setItem("user", JSON.stringify(user));

  return user;
};
