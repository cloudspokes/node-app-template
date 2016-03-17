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
 * Get ALl Accounts
 */
var getContactData = function (email, lastname, firstname, cb) {

    pg.connect(config.DATABASE_URL, cb.wrap(function (client, done) {
        client.query(
            config.SQL.GET_CONTACT,
            [email, lastname, firstname],
            function (err, result) {
                done();
                if (err) {
                    cb(err);
                } else {
                    cb(null, result.rows[0]);
                }
            }
        );
    }));
};

/**
 * Update/Insert contact data, insert if not found.
 * @param  {String}        first the first name
 * @param  {String}        last the last  name
 * @param  {String}        provider the aouth provider
 * @param  {String}        clientid the auth cient id
 * @param  {string}        locale the user locale
 * @param  {String}        email the auth user email
 * @param  {Function<Error>} cb callback function, it has an optional error argument
 */
var upsertContact = function (profile, cb) {
    var first = profile.name.givenName;
    var last  = profile.name.familyName;
    var provider = profile.provider;
    var clientid = profile.id;
    var locale = profile.locale;
    var email = profile.emails[0].value;
    //var emailverified
    var gender = profile.gender;
    var cname = first +' '+last;

    console.log('## email:'+email+'/nFirst:'+first+'/nLast:'+last);
    console.log('QUERY DATABASE:'+config.DATABASE_URL);

    pg.connect(config.DATABASE_URL, cb.wrap(function (client, done) {
            client.query(
                config.SQL.GET_CONTACT,
                [email, last, first],
                function (err, result) {
                    if (err) {
                        done();
                        return cb(err);
                    }
                    
                    if (typeof result.rows[0] == "undefined") {
                        client.query(
                            config.SQL.CREATE_CONTACT,
                            [cname, email, last, first, provider, locale, gender, clientid],
                            function (err2) {
                                done();
                                return cb(err2);
                            }
                        );
                        //done();
                        //return cb(new errors.NotFoundError(config.HTTP_404_MESSAGE));
                    } else {
                        var contact_id = result.rows[0].id;
                        client.query(
                            config.SQL.UPDATE_CONTACT,
                            [provider, clientid, locale, gender, email, contact_id],
                            function (err2) {
                                done();
                                return cb(err2);
                            }
                        );
                    }
                }
            );
        })
    );
};

module.exports = {
    getContactData: logger.wrapFunction(getContactData),
    upsertContact: logger.wrapFunction(upsertContact)
};