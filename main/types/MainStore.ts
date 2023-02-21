import * as main from "../core/main.js";
import { Actions } from "./Actions.js";

export type MainStore = Actions & {
  state: main.State;
};
