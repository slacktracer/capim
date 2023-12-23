export const getOperationListID = ({
  from,
  to,
}: {
  from: string | undefined;
  to: string | undefined;
}) => JSON.stringify({ from, to });
