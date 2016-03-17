/*
 * Copyright (c) 2015 Appirio, Inc. All rights reserved.
 * @author Igor Androsov
 * @version 1.0
 */

"use strict";

/**
 * Import required libraries
 */
var _ = require('underscore');
var config = require("config");
var util = require('util');
var winston = require('winston');

/**
 * Setup logger transport (output to console).
 */
var transports = [];
if (process.env.NODE_ENV !== "test") {
    transports.push(
        new (winston.transports.Console)({level: config.LOG_LEVEL})
    );
}

/**
 * Create logger object
 */
var logger = new (winston.Logger)({transports: transports});

/**
 * Log error details with signature
 * @param err the error
 * @param signature the signature
 */
logger.logFullError = function (err, signature) { // jshint ignore:line
    if (!err) {
        return;
    }
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    logger.error.apply(winston, args);
    logger.error(util.inspect(err));
    logger.error(err.stack);
};

/**
 * Wrap function and log debug information if config.DEBUG is enabled
 *
 * @param {Function}    fn      function to wrap
 * @param {String}      name    optional function name
 * @returns {Function} wrapped function or original if debug is disabled
 */
logger.wrapFunction = function (fn, name) {
    if (config.LOG_LEVEL !== "debug") {
        return fn;
    }
    if (!name) {
        name = fn.name;
    }
    return function () {
        var args = Array.prototype.slice.call(arguments);
        // last arg is callback
        if (args.length > 0 && _.isFunction(args[args.length - 1])) {
            var orgCallback = args.pop();
            logger.debug("ENTER " + name + " " + util.inspect(args));
            var newCallback = function () {
                var cbArgs = Array.prototype.slice.call(arguments);
                if (cbArgs[0]) {
                    logger.logFullError(cbArgs[0], name);
                }
                logger.debug("EXIT CB " + name + ' ' + util.inspect(cbArgs));
                orgCallback.apply(this, cbArgs);
            };
            args.push(newCallback);
            fn.apply(this, args);
        }
        // function w/o cb
        else {
            logger.debug("ENTER " + name + " " + util.inspect(args));
            var result = fn.apply(this, args);
            logger.debug("EXIT " + name + ' ' + util.inspect(result));
        }
    };
};

/**
 * Export logger object
 */
module.exports = logger;