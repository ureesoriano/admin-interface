'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MiddlewareEventEmitter;

var _core = require('@admin-interface/core');

function MiddlewareEventEmitter(eventName) {
    return _core.EventEmitter.getSubscribersByEvent(eventName).map(middleware => middleware.handler);
}
module.exports = exports['default'];