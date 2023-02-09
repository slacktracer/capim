import { get } from "./http/get.js";
import { Operation } from "./types/Operation.js";

export const getOperations = async (): Promise<Operation[]> => {
  try {
    const response = await get(`operations`, {
      timeout: 60000,
    }).json();

    return response as Operation[];
  } catch (error) {
    return [];
  }
};
