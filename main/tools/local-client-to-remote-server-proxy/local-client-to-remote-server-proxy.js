import { readFileSync } from "node:fs";

import httpProxy from "http-proxy";

import { errorHandler } from "./error-handler.js";
import { makeServer } from "./make-server.js";
import { proxyResponseHandler } from "./proxy-response-handler.js";

const certPath = new URL("../../../capim.local.pem", import.meta.url).pathname;
const keyPath = new URL("../../../capim.local-key.pem", import.meta.url)
  .pathname;

const cert = readFileSync(certPath, "utf-8");
const key = readFileSync(keyPath, "utf-8");
const proxy = httpProxy.createProxyServer();
const target = "https://denarii.onrender.com";

proxy.on("error", errorHandler);
proxy.on("proxyRes", proxyResponseHandler);

const server = makeServer({ cert, key, proxy, target });

server.listen(2099, "capim.local");

// eslint-disable-next-line no-console
console.log("Proxy is on!");
