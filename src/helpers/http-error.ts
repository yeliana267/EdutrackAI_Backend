export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const getErrorResponse = (error: unknown, fallbackMessage: string) => {
  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }

  return {
    statusCode: 500,
    message: fallbackMessage,
  };
};