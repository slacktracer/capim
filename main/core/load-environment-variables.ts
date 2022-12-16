import { config } from "./config.js";

export const loadEnvironmentVariables = ({
  runtimeConfig,
}: {
  runtimeConfig: Record<string, any>;
}) => Object.assign(config, runtimeConfig.public);
