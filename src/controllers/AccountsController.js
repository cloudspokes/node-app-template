/*
 * Copyright (c) 2016 Appirio, Inc. All rights reserved.
 * @author Igor Androsov
 * @version 1.0
 */

/**
 * This file provides controller methods for Account management.
 */
"use strict";

/**
 * Import required modules
 */
var config = require("config");
var router = require("express").Router();
var passport = require('../util/ConfiguredPassport');
var Account = require('../database').accounts;
var errors = require('../common/errors');
var validator = require('rox').validator;
var async = require('async');
var moment = require('moment');

/**
 * GET
 * Get User Settings from Account object on given growerid.
 *
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the next middleware
 */
router.get('/accounts', function (req, res, next) {

    console.log('Get list of Accounts');
        
    // get data parts in parallel
    async.parallel([
            // get almaestimate
            function (cb) {
                Account.getAllAccountData(date, cb);
            }
        ],
        function (err, results) {
            if (err) {
                console.log(err);
                return next(err);
            }
            // construct and return result
 
            res.json({
                status: config.SUCCESS_RESULT_STRING,
                published_at: moment().format(config.TIMESTAMP_FORMAT),
                growerid: growerid,
                samplenotificationflag: results[0],
            });
        });

});

/**
 * Export router object
 */
module.exports = router;