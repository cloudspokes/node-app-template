/*
 * Copyright (c) 2015 Appirio, Inc. All rights reserved.
 * @author Igor Androsov
 * @version 1.0
 */

/**
 * This file provides an interface needed to manage account data from database.
 */
"use strict";

/**
 * Import required modules, and functions
 */
var pg = require('pg');
var config = require('config');
var logger = require('../common/logger');
var errors = require('../common/errors');
require("../common/function-utils");

/**
 * Get All Accounts
 */
var getAllAccountData = function (cb) {

    pg.connect(config.DATABASE_URL, cb.wrap(function (client, done) {
        client.query(
            config.SQL.GET_ACCOUNTS,
            function (err, result) {
                done();
                if (err) {
                    cb(err);
                } else {
                    cb(null, result.rows);
                }
            }
        );
    }));
};

/**
 * Get All Accounts
 */
var searchAccountData = function (search, cb) {

    var search_parm = '%'+search+'%';
    pg.connect(config.DATABASE_URL, cb.wrap(function (client, done) {
        client.query(
            config.SQL.GET_ACCOUNTS_SEARCH,
            [search_parm],
            function (err, result) {
                done();
                if (err) {
                    cb(err);
                } else {
                    cb(null, result.rows);
                }
            }
        );
    }));
};

module.exports = {
    getAllAccountData: logger.wrapFunction(getAllAccountData),
    searchAccountData: logger.wrapFunction(searchAccountData)
};