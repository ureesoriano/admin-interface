'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinkModelList = getLinkModelList;
exports.getLinkModelSingle = getLinkModelSingle;

var _core = require('@admin-interface/core');

var _Mount = require('../../Mount/Mount');

/**
 * Get url to list model
 * @param {string} modelKey - Model key
 * @returns {string}
 */
/**
 * @module src/Utils/View/LinkType/ModelView
 * 
 */
function getLinkModelList(modelKey) {
  return `${(0, _Mount.getMountPath)() + _core.Registry.getRepository('Config').get('modelPath')}/${modelKey}/list`;
}

/**
 * Get url to single model item
 * @param {string} modelKey - Model key
 * @param {string} single - Item id of model
 * @returns {string}
 */
function getLinkModelSingle(modelKey, single) {
  return `${(0, _Mount.getMountPath)() + _core.Registry.getRepository('Config').get('modelPath')}/${modelKey}/single/${single}/view`;
}