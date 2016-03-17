/*
 * Copyright (c) 2015 TopCoder, Inc. All rights reserved.
 * @author TCSASSEMBLER
 * @version 1.0
 */

"use strict";

/**
 * This file overwrites config/default.js values if NODE_ENV is set to
 * 'test'
 */

module.exports = {
    "LOG_LEVEL": "error",
    /**
     * User credentials used in unit tests.
     */
    "CREDENTIALS": {
        /**
         * Valid credentials set.
         */
        "VALID": {
            /**
             * Valid user username
             */
            "USERNAME": "user@email.com",
            /**
             * Valid user password
             */
            "PASSWORD": "pass1234",
            /**
             * Valid user apikey
             */
            "APIKEY": "d548309147fb791b9f3d4d831468a706"
        },
        /**
         * Invalid credentials set.
         */
        "INVALID": {
            /**
             * Valid user username
             */
            "USERNAME": "non@existing.user",
            /**
             * Valid user password
             */
            "PASSWORD": "with.wrong.password",
            /**
             * Valid user apikey
             */
            "APIKEY": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        }
    }
}