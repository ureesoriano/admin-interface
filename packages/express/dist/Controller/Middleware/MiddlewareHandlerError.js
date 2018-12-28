'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.getErrorInformation = getErrorInformation;

exports.default = function (err, req, res, next) {
    if (err instanceof Error) {
        let errorInfo = {};
        const status = err.status ? Number(err.status) : null;

        if (status === 404) {
            errorInfo = getErrorInformation('pages/error/404', err.message, 'This page doesn\'t exist');
        } else {
            errorInfo = getErrorInformation('pages/error/500', err.message, 'Internal Server Error');
        }

        // Set response code status
        res.status(status || 500);

        // Send json
        if (err.json) {
            return res.json(errorInfo);
        }

        // Send template
        return res.render(errorInfo.template, (0, _extends3.default)({
            bodyClass: 'four-zero-four'
        }, errorInfo));
    }

    return next();
};

var _ErrorResponse = require('../../Utils/ErrorResponse/ErrorResponse');

var _ErrorResponse2 = _interopRequireDefault(_ErrorResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get error information
 * @param template
 * @param message
 * @param defaultErrorMessage
 * @returns {{template: *, message: null}}
 */
function getErrorInformation(template, message, defaultErrorMessage) {
    return {
        template,
        message: process.env.NODE_ENV !== 'production' ? message || defaultErrorMessage : null
    };
}

/**
 * Middleware Handler Error
 * @param req
 * @param res
 * @param next
 * @param err
 */