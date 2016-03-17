/*
 * Copyright (c) 2016 Appirio, Inc. All rights reserved.
 * @author Igor Androsov
 * @version 1.0
 */

/**
 * This file defines configuration variables for application.
 */
"use strict";

module.exports = {

    /**
     * Amount of details logged to console depends on this setting.
     * Possible values are: silly, debug, verbose, info, warn, error
     */
    LOG_LEVEL: "debug",

    /**
     * Port at which API server should be listening
     */
    PORT: process.env.PORT || 5000,

    // URL:
    // https://shout-about-public-developer-edition.na30.force.com/servlet/servlet.FileDownload?file=01536000000FKHo

    /**
     * Postresql database connection string.
     */
    // shared cloud database
    //DATABASE_URL: process.env.DATABASE_URL || "postgres://hrpdfgdptllzhd:8wbSvMZXNqvfJT_Ftm-11zsh7h@ec2-54-225-215-233.compute-1.amazonaws.com:5432/d3cq9181mvjskr?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory",
    DATABASE_URL: process.env.DATABASE_URL || "postgres://uas9lfmde6upgv:p6auoi7khbobsv4n8039s3impvb@ec2-52-71-193-196.compute-1.amazonaws.com:5432/db3tpp7s5onoia?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory",   
    
    /**
     * String returned in "status" field of successfull responses.
     */
    SUCCESS_RESULT_STRING: "Success",

    /**
     * String returned in "status" field of failing responses.
     */
    FAILURE_RESULT_STRING: "Failure",

    /**
     * It is date format. See http://momentjs.com/docs/#/displaying/ for supported formats.
     */
    DATE_FORMAT: "YYYY-MM-DD",

    /**
     * It is timestamp format. See http://momentjs.com/docs/#/displaying/ for supported formats.
     */
    TIMESTAMP_FORMAT: "YYYY-MM-DD HH:mm:ss",

    /**
     * String returned in "resultDetails" field of responses with invalid path.
     */
    HTTP_404_MESSAGE: "404 Not Found",

    
    /**
     * SQL queries used by app
     */
    SQL: {

        /**
         * Query Account info
         */
         GET_ACCOUNTS: "SELECT sfid as id, name as text FROM salesforce.account WHERE type = 'Hospital';",

        /**
         * Query Search Account info on dynamic name characters
         */
         GET_ACCOUNTS_SEARCH: "SELECT sfid as id, name as text FROM salesforce.account WHERE type = 'Hospital' AND name LIKE ($1);",

        /**
         * Query used to create new Contact.
         */
        CREATE_CONTACT: "INSERT INTO salesforce.contact (name, email, lastname, firstname, auth_provider__c, locale__c, gender__c, client_id__c, isdeleted) " +
        "VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), false);",

        /**
         * Query used to update existing Contact with social sign in information.
         */
        UPDATE_CONTACT: "UPDATE salesforce.contact SET auth_provider__c = ($1), client_id__c = ($2), locale__c = ($3), gender__c = ($4), email = ($5) WHERE id = ($6);",

        /**
         * Query Contact to get matching id if exists.
         */
        GET_CONTACT: "SELECT id, sfid FROM salesforce.contact WHERE email = ($1) AND lastname = ($2) AND firstname = ($3);",

        /**
         * Query used to check whether contact of a user exists.
         */
        CHECK_CONTACT_EXISTENCE: "SELECT COUNT(*) AS contactcount FROM salesforce.contact WHERE email = ($1) AND lastname = ($2) AND firstname = ($3);",


    }
}