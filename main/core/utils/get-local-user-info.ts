import { storage } from "../storage.js";

export const getLocalUserInfo = () =>
  JSON.parse(storage.getItem("user") as string);
