import * as main from "../../core/main.js";
import { State } from "../../core/main.js";

export const getOperations = async (state: State) => {
  const operations = await main.getOperations();

  state.operations = operations;
};
