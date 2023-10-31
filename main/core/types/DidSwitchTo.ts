export type DidSwitchTo = (input: {
  currentValue: boolean;
  previousValue: boolean;
  to: boolean;
}) => boolean;
