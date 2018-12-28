'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _core = require('@admin-interface/core');

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
        _core.Registry.getRepository('App').set('cwd', dirname);

        const config = (0, _core.yamlConfigParse)(dirname, configFile);
        _core.EventEmitter.emit('set-config', config);

        // Do not use the .admininterfacerc file
        this.setUseRC(false);

        return this;
    }

    start() {
        if (this.getUseRC()) {
            // Set config file from the .admininterfacerc file
            (0, _core.setConfigFileFromRc)();
        }

        _core.EventEmitter.emit('start:after');

        _core.EventEmitter.emit('start:init-plugin', this);

        _core.EventEmitter.emit('start');

        _core.EventEmitter.emit('start:before');
    }

    middleware() {
        // run project
        this.start();

        // get local express app
        return _core.Registry.getRepository('App').get('instance');
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