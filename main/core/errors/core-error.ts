export class CoreError extends Error {
  private data: Record<string, any>;
  private date: Date;

  constructor(data: Record<string, any>, ...parameters: any[]) {
    super(...parameters);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CoreError);
    }

    this.name = "CoreError";

    this.data = data;
    this.date = new Date();
  }
}
