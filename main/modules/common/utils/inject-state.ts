export const injectState =
  <State, Input extends object>(
    fun: (...input: [Input & { state: State }, ...unknown[]]) => unknown,
    state: State,
  ) =>
  (input: Input, ...rest: unknown[]): ReturnType<typeof fun> =>
    fun(Object.assign(input, { state }), ...rest);
