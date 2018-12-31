'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startAfter = startAfter;
exports.startEvent = startEvent;
exports.startBefore = startBefore;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _adminInterfaceMnCore = require('admin-interface-mn-core');

var _Router = require('../../Router/Router');

var _Router2 = _interopRequireDefault(_Router);

var _Static = require('../../Utils/View/Static');

var _Mount = require('../../Utils/Mount/Mount');

var _Link = require('../../Utils/View/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startAfter() {
    // Create the express instance
    _adminInterfaceMnCore.Registry.getRepository('App').set('instance', (0, _express2.default)());
    // Set dynamic configuration
    _adminInterfaceMnCore.Registry.getRepository('Config').set('locals.Registry', _adminInterfaceMnCore.Registry);
    _adminInterfaceMnCore.Registry.getRepository('Config').set('locals.getStaticFile', _Static.getStaticFile);
    _adminInterfaceMnCore.Registry.getRepository('Config').set('locals.getMountPath', _Mount.getMountPath);
    _adminInterfaceMnCore.Registry.getRepository('Config').set('locals.Link', _Link2.default);
    // Set locals
    _adminInterfaceMnCore.Registry.getRepository('App').get('instance').locals = _adminInterfaceMnCore.Registry.getRepository('Config').get('locals');
}

function startEvent() {
    // Set admin interface views
    _adminInterfaceMnCore.Registry.getRepository('Config').push('views', _path2.default.join(_adminInterfaceMnCore.Registry.getRepository('Config').get('Module.core'), 'views'));
    _adminInterfaceMnCore.Registry.getRepository('App').get('instance').set('view engine', 'jade');
    _adminInterfaceMnCore.Registry.getRepository('App').get('instance').set('views', _adminInterfaceMnCore.Registry.getRepository('Config').get('views'));
}

function startBefore() {
    const router = new _Router2.default();

    // Set routing and middleware
    _adminInterfaceMnCore.Registry.getRepository('App').get('instance').use(_bodyParser2.default.urlencoded({ extended: false }));
    _adminInterfaceMnCore.Registry.getRepository('App').get('instance').use(_adminInterfaceMnCore.Registry.getRepository('Config').get('staticPath'), _express2.default.static(_path2.default.join(_adminInterfaceMnCore.Registry.getRepository('Config').get('Module.front'), 'dist')));
    _adminInterfaceMnCore.Registry.getRepository('App').get('instance').use(router.getRouter());
}