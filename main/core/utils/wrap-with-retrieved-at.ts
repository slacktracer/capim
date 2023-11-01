export const wrapWithRetrievedAt = <Type>({ data }: { data: Type }) => ({
  data,
  retrievedAt: new Date(),
});
