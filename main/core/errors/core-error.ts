export class CoreError extends Error {
  public data: Record<string, any>;
  public date: Date;

  constructor(
    message: string,
    data: Record<string, any>,
    ...parameters: any[]
  ) {
    super(...[message, ...parameters]);

    if ("captureStackTrace" in Error) {
      (Error.captureStackTrace as (...args: any[]) => void)(this, CoreError);
    }

    this.name = "CoreError";

    this.data = data;
    this.date = new Date();
  }
}
