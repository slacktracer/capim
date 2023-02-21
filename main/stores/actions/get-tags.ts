import * as main from "../../core/main.js";
import { State } from "../../core/main.js";

export const getTags = async (state: State) => {
  const tags = await main.getTags();

  state.tags = tags;
};
