'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMountPath = getMountPath;

var _core = require('@admin-interface/core');

/**
 * Get mount path
 * @returns {string}
 */
function getMountPath() {
  return _core.Registry.getRepository('App').get('instance').mountpath;
} /**
   * @module src/Utils/Mount/Mount
   * 
   */