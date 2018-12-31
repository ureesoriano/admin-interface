'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMountPath = getMountPath;

var _adminInterfaceMnCore = require('admin-interface-mn-core');

/**
 * Get mount path
 * @returns {string}
 */
function getMountPath() {
  return _adminInterfaceMnCore.Registry.getRepository('App').get('instance').mountpath;
} /**
   * @module src/Utils/Mount/Mount
   * 
   */