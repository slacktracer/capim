import { get } from "./http/get.js";
import { Balance } from "./types/Balance.js";

export const getBalances = async (): Promise<Balance> => {
  try {
    const response = await get("balances").json();

    return response as Balance;
  } catch (error: any) {
    return [];
  }
};
