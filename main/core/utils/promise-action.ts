const create: unique symbol = Symbol("create");
const del: unique symbol = Symbol("delete");
const noop: unique symbol = Symbol("noop");
const notSet: unique symbol = Symbol("notSet");
const read: unique symbol = Symbol("read");
const update: unique symbol = Symbol("update");

export const promiseAction = {
  create,
  delete: del,
  noop,
  notSet,
  read,
  update,
} as const;
