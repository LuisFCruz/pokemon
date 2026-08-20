export type GatewaySuccess<T> = {
  success: true;
  data: T;
};

export type GatewayFailure = {
  success: false;
  error: Error;
};

export type GatewayResult<T> = GatewaySuccess<T> | GatewayFailure;
