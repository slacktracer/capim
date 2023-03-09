import type { UserStoreState } from "../../types/UserStoreState.js";

export const getInitialUserStoreState = (): UserStoreState => ({
  user: undefined,
});
