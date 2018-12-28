'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * @param message
 * @param status
 * @param json
 * @constructor
 */
class ErrorResponse extends Error {

    constructor(message, status = 500, json = false) {
        super(message);

        // Capturing stack trace, excluding constructor call from it.
        this.status = 500;
        this.json = false;
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;

        if (typeof status === 'number') {
            this.status = status;
        }

        if (typeof json === 'boolean') {
            this.json = json;
        }
    }
}

exports.default = ErrorResponse;
module.exports = exports['default'];