'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocalConfig = getLocalConfig;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _adminInterfaceMnCore = require('admin-interface-mn-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get local configuration
 * @returns {{any}}
 */
/**
 * @module src/Utils/Config/Config
 * 
 */
function getLocalConfig() {
  const root = _path2.default.join(__dirname, '../../../config');
  return (0, _adminInterfaceMnCore.yamlConfigParse)(root, 'admin-interface.yaml');
}