'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultFileRc = getDefaultFileRc;
exports.setConfigFileFromRc = setConfigFileFromRc;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _EventEmitter = require('../../EventEmitter/EventEmitter');

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _Parser = require('../Yaml/Parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get default options
 * @returns {*}
 */
function getDefaultFileRc() {
    return {
        configFile: 'admin-interface.yaml'
    };
}

/**
 * Set the config file from the .admininterfacerc file
 */
function setConfigFileFromRc() {
    const pathFile = _path2.default.join(_path2.default.dirname(require.main.filename), '.admininterfacerc');
    if (!_fs2.default.existsSync(pathFile)) {
        throw new Error('Don\'t find a file .admininterfacerc');
    }

    try {
        // Include the .admininterfacerc file
        const configrc = require(pathFile); // eslint-disable-line import/no-dynamic-require, global-require
        // File name
        const configFileName = configrc.configFile || getDefaultFileRc().configFile;
        // Parse yaml config
        const config = (0, _Parser.yamlConfigParse)(_path2.default.dirname(pathFile), configFileName);

        // Set config
        _EventEmitter2.default.emit('set-config', config);
    } catch (err) {
        throw err;
    }
}