'use strict';

var _core = require('@admin-interface/core');

var _setConfig = require('./Events/set-config');

var _start = require('./Events/start');

_core.EventEmitter.subscribe('set-config', _setConfig.setConfigEvent);

_core.EventEmitter.subscribe('start:after', _start.startAfter);
_core.EventEmitter.subscribe('start', _start.startEvent);
_core.EventEmitter.subscribe('start:before', _start.startBefore);