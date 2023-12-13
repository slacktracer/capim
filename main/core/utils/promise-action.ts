const create: unique symbol = Symbol("create");
const notSet: unique symbol = Symbol("notSet");
const read: unique symbol = Symbol("read");
const update: unique symbol = Symbol("update");

export const promiseAction = {
  notSet,
  create,
  read,
  update,
} as const;
