/**
 * @author Óscar Font
 * =========================
 * ErrorHandler function
 * =========================
 * @description 
 * This function has the main responsibility of handling the errors
 * and formatting them accordingly depending on the detected error.
 */

import { formatter } from "./formatter.js";
import NotFound from "../models/errors/NotFound.js";
import AuthenticationError from "../models/errors/AuthenticationError.js";
import InvalidRequest from "../models/errors/InvalidRequest.js";

const statuses = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
}

export const errorHandler = (err, req, res, next) => {

    if (err instanceof NotFound) {
        res.status(statuses.NOT_FOUND).send(formatter.formatErrorResponse(err.message));
    }
    else if (err instanceof AuthenticationError) {
        res.status(statuses.UNAUTHORIZED).send(formatter.formatErrorResponse(err.message));
    }
    else if (err instanceof InvalidRequest) {
        res.status(statuses.BAD_REQUEST).send(formatter.formatErrorResponse(err.message));
    }
    else {
        res.status(statuses.INTERNAL_ERROR).send(formatter.formatErrorResponse(err.message));
    }
}