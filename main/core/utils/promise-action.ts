const create: unique symbol = Symbol("create");
const noop: unique symbol = Symbol("noop");
const notSet: unique symbol = Symbol("notSet");
const read: unique symbol = Symbol("read");
const update: unique symbol = Symbol("update");

export const promiseAction = {
  create,
  noop,
  notSet,
  read,
  update,
} as const;
