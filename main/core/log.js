const contexts = {};

export const log = (contextName) => {
  if (contexts[contextName]) {
    return contexts[contextName];
  }

  return new Proxy(
    {},
    {
      get: (_target, property) => {
        return (...args) => {
          args.unshift(`[${contextName}]`);

          window.console[property](...args);
        };
      },
    },
  );
};
