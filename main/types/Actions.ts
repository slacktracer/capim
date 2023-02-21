import { Ref } from "vue";

export type Actions = {
  boot: () => Promise<void>;
  getAccounts: () => Promise<void>;
  getBalances: () => Promise<void>;
  getOperations: () => Promise<void>;
  getTags: () => Promise<void>;
  login: (args: {
    password: Ref<string>;
    username: Ref<string>;
  }) => Promise<void>;
  logout: () => Promise<void>;
};
