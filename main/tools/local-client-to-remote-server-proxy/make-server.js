import https from "node:https";

export const makeServer = ({ cert, key, proxy, target }) =>
  https.createServer({ cert, key }, (request, response) =>
    proxy.web(request, response, { changeOrigin: true, secure: true, target }),
  );
