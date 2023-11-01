import type { Category } from "../../core/types/Category.js";
import type { GetCategories } from "../../types/GetCategories.js";
import { newLoadDataIntoState } from "../common/utils/new-load-data-into-state.js";
import { memoisedGetCategories } from "./memoised-get-categories.js";

let invalidateCount = 0;

export const getCategories: GetCategories = ({ invalidate, state }) => {
  if (invalidate) {
    invalidateCount += 1;
  }

  newLoadDataIntoState<Category[]>({
    functionToCall: () => memoisedGetCategories({ invalidateCount }),
    stateToUpdate: state.categories,
  });
};
