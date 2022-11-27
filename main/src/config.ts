// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useRuntimeConfig } from "#imports";

const runtimeConfig = useRuntimeConfig();

export const config = {
  baseURL: runtimeConfig.public.baseURL,
};
