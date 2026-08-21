export class GatewayError extends Error {
  public readonly statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "GatewayError";
    this.statusCode = statusCode;
  }
}
