export const wrapWithRetrievedAt = <Collection>({
  data,
}: {
  data: Collection;
}) => ({
  data,
  retrievedAt: new Date(),
});
