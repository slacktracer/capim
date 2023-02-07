export const proxyResponseHandler = (proxyResponse, request, response) => {
  proxyResponse.headers = Object.keys(proxyResponse.headers)
    .filter((header) => !header.toLowerCase().startsWith("access-control-"))
    .reduce(
      (headers, header) => ({
        ...headers,
        [header]: proxyResponse.headers[header],
      }),
      {},
    );

  const { headers } = request;

  const accessControlRequestHeaders = headers["access-control-request-headers"];

  if (accessControlRequestHeaders) {
    response.setHeader(
      "access-control-allow-headers",
      accessControlRequestHeaders,
    );
  }

  const accessControlRequestMethod = headers["access-control-request-method"];

  if (accessControlRequestMethod) {
    response.setHeader(
      "access-control-allow-methods",
      accessControlRequestMethod,
    );
  }

  const { origin } = headers;

  if (origin) {
    response.setHeader("access-control-allow-credentials", "true");
    response.setHeader("access-control-allow-origin", origin);
  }
};
