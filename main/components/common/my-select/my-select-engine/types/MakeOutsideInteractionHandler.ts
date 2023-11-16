export type MakeOutsideInteractionHandler = (input: {
  container: HTMLElement;
}) => (input: Event) => void;
