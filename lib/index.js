"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiResponse = exports.convertToAppError = void 0;
var lodash_1 = require("lodash");
function convertToAppError(error) {
    var defaultHttpStatus = 500;
    var defaultDescription = "Internal server error";
    var defaultError = new Error("Unexpected error");
    if (lodash_1.isNil(error)) {
        return {
            httpStatus: 500,
            description: "Internal server error",
            error: new Error("Unexpected error happened"),
        };
    }
    return {
        httpStatus: lodash_1.get(error, "httpStatus", defaultHttpStatus),
        description: lodash_1.get(error, "description", defaultDescription),
        error: lodash_1.get(error, "error", defaultError),
    };
}
exports.convertToAppError = convertToAppError;
function getApiResponse(message) {
    var isError = !lodash_1.isNil(lodash_1.get(message, "error", null));
    return {
        status: isError ? message.httpStatus : 200,
        body: isError ? { error: message.description } : message,
    };
}
exports.getApiResponse = getApiResponse;
