'use strict';

var _adminInterfaceMnCore = require('admin-interface-mn-core');

var _setConfig = require('./Events/set-config');

var _start = require('./Events/start');

_adminInterfaceMnCore.EventEmitter.subscribe('set-config', _setConfig.setConfigEvent);

_adminInterfaceMnCore.EventEmitter.subscribe('start:after', _start.startAfter);
_adminInterfaceMnCore.EventEmitter.subscribe('start', _start.startEvent);
_adminInterfaceMnCore.EventEmitter.subscribe('start:before', _start.startBefore);