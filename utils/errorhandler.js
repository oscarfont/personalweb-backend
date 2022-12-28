import { formatter } from "./formatter.js";
import NotFound from "../models/errors/NotFound.js";
import AuthenticationError from "../models/errors/AuthenticationError.js";
import InvalidRequest from "../models/errors/InvalidRequest.js";
import LoggerAdapter from "../adapters/logger/Logger.js";
import { LogLevel } from "../adapters/logger/LogLevel.js";

/**
 * @author Óscar Font
 * =========================
 * ErrorHandler function
 * =========================
 * @description 
 * This function has the main responsibility of handling the errors
 * and formatting them accordingly depending on the detected error.
 */

const statuses = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
}

export const errorHandler = (err, req, res, next) => {

    const logger = new LoggerAdapter();

    const path = req.originalUrl;
    let status = statuses.INTERNAL_ERROR;
    let error = 'SERVER INTERNAL ERROR';
    const message = err.message;

    if (err instanceof NotFound) {
        status = statuses.NOT_FOUND;
        error = 'NOT FOUND';
    }
    else if (err instanceof AuthenticationError) {
        status = statuses.UNAUTHORIZED;
        error = 'UNAUTHORIZED';
    }
    else if (err instanceof InvalidRequest) {
        status = statuses.BAD_REQUEST;
        error = 'BAD REQUEST';
    }

    logger.log(path, LogLevel.ERROR, `method: ${req.method}, error: ${error} statusCode: ${status}, message: ${message}`)
    res.status(status).send(formatter.formatErrorResponse(message));
}