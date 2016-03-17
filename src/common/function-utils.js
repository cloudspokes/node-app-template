/*
 * Copyright (c) 2016 Appirio, Inc. All rights reserved.
 * @author Igor Androsov
 * @version 1.0
 */

"use strict";

/**
 * Return a function which will call original function only with its first
 * argument.
 *
 * @param {Object}      context "this" context
 * @returns {Function}  wrapped original function
 */
Function.prototype.firstArgumentOnly = function (context) {
    var self = this;
    return function (err) {
        self.call(context, err);
    };
};

/**
 * Return a function which wraps original function.
 *
 * When returned function will be called with first parameter other than null,
 * than original function will be called.
 *
 * Otherwise, all arguments without first one will be forwarded to function
 * which was passed as a first argument of the wrap function.
 *
 * @param {Function}    Function to call if first argument is null
 * @param {Object}      context "this" context
 * @returns {Function}  Function wrapping original one and deciding which one
 *                      to call
 */
Function.prototype.wrap = function (fn, context) {
    var self = this;
    return function (err) {
        if (err) {
            self(err);
        } else {
            var args = Array.prototype.slice.call(arguments);
            if (args.length) {
                args.shift();
            }
            fn.apply(context, args);
        }
    };
};