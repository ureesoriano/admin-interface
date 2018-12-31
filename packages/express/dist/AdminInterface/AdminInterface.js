'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _adminInterfaceMnCore = require('admin-interface-mn-core');

require('../Event/Installation');

/**
 * Admin Interface class
 */
class AdminInterface {
    constructor() {
        this._useRC = true;
    }

    setConfigFile(dirname, configFile) {
        // aeslint-disable-line class-methods-use-this
        _adminInterfaceMnCore.Registry.getRepository('App').set('cwd', dirname);

        const config = (0, _adminInterfaceMnCore.yamlConfigParse)(dirname, configFile);
        _adminInterfaceMnCore.EventEmitter.emit('set-config', config);

        // Do not use the .admininterfacerc file
        this.setUseRC(false);

        return this;
    }

    start() {
        if (this.getUseRC()) {
            // Set config file from the .admininterfacerc file
            (0, _adminInterfaceMnCore.setConfigFileFromRc)();
        }

        _adminInterfaceMnCore.EventEmitter.emit('start:after');

        _adminInterfaceMnCore.EventEmitter.emit('start:init-plugin', this);

        _adminInterfaceMnCore.EventEmitter.emit('start');

        _adminInterfaceMnCore.EventEmitter.emit('start:before');
    }

    middleware() {
        // run project
        this.start();

        // get local express app
        return _adminInterfaceMnCore.Registry.getRepository('App').get('instance');
    }

    setUseRC(useRC = true) {
        if (typeof useRC === 'boolean') {
            this._useRC = useRC;
        }
        return this;
    }

    getUseRC() {
        return this._useRC;
    }
}

exports.default = AdminInterface;
module.exports = exports['default'];