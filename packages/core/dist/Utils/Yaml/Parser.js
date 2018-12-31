'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configParser = configParser;
exports.yamlParse = yamlParse;
exports.yamlConfigParse = yamlConfigParse;
exports.yamlConfigRoutingParser = yamlConfigRoutingParser;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _yamlInclude = require('yaml-include');

var _yamlInclude2 = _interopRequireDefault(_yamlInclude);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _Registry = require('../../Registry/Registry');

var _Registry2 = _interopRequireDefault(_Registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse config object
 * @param {any} obj
 * @param {string} dirname
 * @param {any} type
 * @returns {any}
 */
function configParser(obj, dirname, type = {}, cache = {}) {
    let imported = type;

    _lodash2.default.forIn(obj, (filePath, key) => {
        if (typeof filePath === 'object') {
            if (!isNaN(Number(key))) {
                // eslint-disable-line no-restricted-globals
                imported[key] = filePath;
                imported = _lodash2.default.values(imported);
            } else {
                imported[key] = configParser(filePath, dirname, {}, cache);
            }
        }

        if (Array.isArray(filePath)) {
            imported[key] = configParser(filePath, dirname, [], cache);
        }

        if (typeof filePath === 'string') {
            if (filePath.substr(0, 2) === './' || filePath.substr(0, 8) === '[module]') {
                let fsPath = '';

                if (filePath.substr(0, 8) === '[module]') {
                    const moduleInfo = filePath.split(' ');
                    const modulePath = moduleInfo[1].split('/');
                    const moduleName = moduleInfo[1][0] === '@' ? `${modulePath[0]}/${modulePath[1]}` : modulePath[0];
                    const moduleFile = modulePath.join('/').replace(moduleName, '');

                    if (!cache[moduleName]) {
                        // eslint-disable-next-line no-param-reassign
                        cache[moduleName] = _globby2.default.sync(`${_Registry2.default.getRepository('App').get('cwd')}/node_modules/**/**/${moduleName}/`, {
                            nodir: false
                        })[0];
                    }

                    if (cache[moduleName]) {
                        fsPath = _path2.default.join(cache[moduleName], moduleFile);

                        global.console.log('connected module [%s]: %s', moduleName, fsPath);
                        global.console.log('------------------');
                    } else {
                        global.console.log('module not found [%s]: %s', moduleName, fsPath);
                        global.console.log('------------------');
                    }
                } else {
                    fsPath = _path2.default.join(dirname, filePath);
                }

                if (fsPath.length) {
                    const info = _fs2.default.statSync(fsPath);

                    if (info.isFile()) {
                        // eslint-disable-next-line global-require, import/no-dynamic-require
                        imported[key] = require(fsPath);
                    }
                    if (info.isDirectory()) {
                        imported[key] = fsPath;
                    }
                }
            } else if (!isNaN(Number(key))) {
                // eslint-disable-line no-restricted-globals
                imported[key] = filePath;
                imported = _lodash2.default.values(imported);
            } else {
                imported[key] = filePath;
            }
        }
    });
    // console.log(imported);
    return imported;
}

/**
 * Parser yarn fie
 * @param {string} pathConfigFile
 * @returns {{any}}
 */
/**
 * @module src/Utils/Yaml/Parser
 * 
 */
function yamlParse(pathConfigFile) {
    _yamlInclude2.default.setBaseFile(pathConfigFile);

    const configSrc = _fs2.default.readFileSync(pathConfigFile, 'utf8');

    return _jsYaml2.default.load(configSrc, {
        schema: _yamlInclude2.default.YAML_INCLUDE_SCHEMA,
        filename: _yamlInclude2.default.basefile
    });
}

/**
 * Parse yaml config file
 * @param {string} dirname
 * @param {string} configFile
 * @returns {{any}}
 */
function yamlConfigParse(dirname, configFile) {
    const configPath = _path2.default.join(dirname, configFile);
    const config = yamlParse(configPath);
    return configParser(config, dirname);
}

/**
 * Parse yaml routing file
 * @param {string} dirname
 * @param {string} configFile
 * @returns {{any}}
 */
function yamlConfigRoutingParser(dirname, configFile) {
    const config = yamlConfigParse(dirname, configFile);
    // Set handler of route
    Object.keys(config).forEach(key => {
        config[key].handler = config[key].controller[config[key].action];
    });
    return config;
}