export const getMainStoreDefaultState = () => ({
  accounts: [],
  accountsByID: {},
  balances: [],
  operations: [],
  tagKeysByID: {},
  tags: { keys: [], values: [] },
  tagValuesByID: {},
  user: null,
});
