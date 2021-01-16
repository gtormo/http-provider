import { AppError } from "error-type";
export interface ApiResponse {
    status: number;
    body: Record<string, any>;
}
export declare function convertToAppError(error: Error | AppError): AppError;
export declare function getApiResponse(message: Record<string, any> | AppError): ApiResponse;
