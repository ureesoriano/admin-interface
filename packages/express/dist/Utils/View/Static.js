'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStaticFile = getStaticFile;

var _adminInterfaceMnCore = require('admin-interface-mn-core');

var _Mount = require('../Mount/Mount');

/**
 * Get static file url
 * @param {string} filePath
 * @returns {string}
 */
/**
 * @module src/Utils/Sequelize/Query
 * 
 */
function getStaticFile(filePath = '') {
  return (0, _Mount.getMountPath)() + _adminInterfaceMnCore.Registry.getRepository('Config').get('staticPath') + filePath;
}