export const errorHandler = (error, _request, response) => {
  response.writeHead(500, {
    "Content-Type": "text/plain",
  });

  response.end("Proxy Error: " + error);
};
