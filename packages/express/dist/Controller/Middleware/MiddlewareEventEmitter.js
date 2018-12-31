'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MiddlewareEventEmitter;

var _adminInterfaceMnCore = require('admin-interface-mn-core');

function MiddlewareEventEmitter(eventName) {
    return _adminInterfaceMnCore.EventEmitter.getSubscribersByEvent(eventName).map(middleware => middleware.handler);
}
module.exports = exports['default'];