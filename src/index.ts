import { AppError } from "error-type";
import { isNil, get } from "lodash";

export interface ApiResponse {
  status: number;
  body: Record<string, any>;
}

export function convertToAppError(error: Error | AppError): AppError {
  const defaultHttpStatus: number = 500;
  const defaultDescription: string = "Internal server error";
  const defaultError: Error = new Error("Unexpected error");

  if (isNil(error)) {
    return {
      httpStatus: 500,
      description: "Internal server error",
      error: new Error("Unexpected error happened"),
    };
  }

  return {
    httpStatus: get(error, "httpStatus", defaultHttpStatus),
    description: get(error, "description", defaultDescription),
    error: get(error, "error", defaultError),
  };
}

export function getApiResponse(
  message: Record<string, any> | AppError
): ApiResponse {
  const isError: boolean = !isNil(get(message, "error", null));

  return {
    status: isError ? message.httpStatus : 200,
    body: isError ? { error: message.description } : message,
  };
}
