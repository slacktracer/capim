import { get } from "./http/get.js";
import { mainRequestErrorHandler } from "./http/main-request-error-handler.js";
import type { Category } from "./types/Category.js";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await get(`categories`, {
      timeout: 60000,
    }).json<Category[]>();

    return response;
  } catch (error: any) {
    await mainRequestErrorHandler({ error });

    return [];
  }
};
