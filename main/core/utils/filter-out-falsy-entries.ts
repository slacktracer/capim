export const filterOutFalsyEntries = ({
  object,
}: {
  object: Record<string, unknown>;
}) => {
  const filteredEntries = Object.entries(object).filter(([, value]) => !!value);

  return Object.fromEntries(filteredEntries) as Record<string, string>;
};
