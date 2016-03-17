/*
 * Copyright (c) 2016 Appirio, Inc. All rights reserved.
 * @author Igor Androsov
 * @version 1.0
 */

/**
 * This module exposes interface to create HTTP Error object instances
 */
"use strict";

/**
 * Import required modules, and functions
 */
var util = require('util');

/**
 * Function return constructor of HTTP Error objects.
 *
 * @param  {String}     Error type name
 * @param  {Number}     HTTP status code representing this error
 * @return {Function}   Constructor of HTTP Error objects
 */
function _createError(name, statusCode) {
    /**
     * HTTP Error object constructor
     * @param   {String}    detailed error message
     * @param   {String}    detailed cause of the error
     */
    function ErrorConstructor(message, cause) {
        Error.call(this);
        Error.captureStackTrace(this);
        this.message = message || name;
        this.cause = cause;
        this.httpStatus = statusCode;
    }

    util.inherits(ErrorConstructor, Error);
    ErrorConstructor.prototype.name = name;
    return ErrorConstructor;
}

/**
 * Export various HTTP Error object constructors
 */
module.exports = {
    ValidationError: _createError("ValidationError", 400),
    BadRequestError: _createError("BadRequestError", 400),
    NotFoundError: _createError("NotFoundError", 404),
    ForbiddenError: _createError("ForbiddenError", 403),
    UnauthorizedError: _createError("UnauthorizedError", 401)
};