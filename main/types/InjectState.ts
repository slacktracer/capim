export type InjectState = <Function extends (...args: any[]) => any, State>(
  fun: Function,
  state: State,
) => (
  input: Omit<Parameters<Function>[0], "state">,
  ...rest: unknown[]
) => ReturnType<Function>;
