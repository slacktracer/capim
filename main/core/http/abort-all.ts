import { ongoingRequestsControllers } from "./ongoing-requests-controllers.js";

export const abortAll = ({ reason }: { reason: string }) => {
  const ongoingRequestsControllersSymbols = Object.getOwnPropertySymbols(
    ongoingRequestsControllers,
  );

  ongoingRequestsControllersSymbols.forEach((symbol) =>
    ongoingRequestsControllers[symbol].abort(reason),
  );
};
