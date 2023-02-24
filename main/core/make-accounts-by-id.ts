import { Account } from "./types/Account.js";
import { AccountsByID } from "./types/AccountsByID.js";

export const makeAccountsByID = ({
  accounts,
}: {
  accounts: Account[];
}): AccountsByID => {
  const accountsByID = accounts.reduce(
    (reduction: Record<string, Account>, key: Account) => {
      reduction[key.accountID] = key;

      return reduction;
    },
    {},
  );

  return accountsByID;
};
