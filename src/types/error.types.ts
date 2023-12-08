export type ErrorResponse = {
  success: boolean;
  error: Error;
};

export type Error = {
  message: string;
  error: string;
  statusCode: number;
};
