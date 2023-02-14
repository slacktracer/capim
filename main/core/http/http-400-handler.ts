import { log } from "../log.js";

const http400HandlerLog = log("HTTP_400_HANDLER");

export const http400Handler = async ({ response }: any) => {
  const { message } = await response.json();

  http400HandlerLog.warn("400 Bad Request", message);
};
