'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinkApiModelList = getLinkApiModelList;
exports.getLinkApiModelDelete = getLinkApiModelDelete;
exports.getLinkApiModelCreate = getLinkApiModelCreate;
exports.getLinkApiModelSingleUpdate = getLinkApiModelSingleUpdate;

var _core = require('@admin-interface/core');

var _Mount = require('../../Mount/Mount');

/**
 * Get URL to data of items from model
 * @param {string} modelKey - Model key
 * @param {string} refModelKey - Reference Model key
 * @param {string} refModelValue - Reference Model value
 * @returns {string}
 */
/**
 * @module src/Utils/View/LinkType/ModelAPI
 * 
 */
function getLinkApiModelList(modelKey, refModelKey, refModelValue) {
  let url = `${(0, _Mount.getMountPath)() + _core.Registry.getRepository('Config').get('apiPath') + _core.Registry.getRepository('Config').get('modelPath')}/${modelKey}/list`;
  if (refModelKey && refModelValue) {
    url += `?refModel=${refModelKey}&refModelKey=${refModelValue}`;
  }
  return url;
}

/**
 * Get URL to delete item from model
 * @param {string} modelKey - Model key
 * @param {string} single - Item id of model
 * @returns {string}
 */
function getLinkApiModelDelete(modelKey, single) {
  return `${(0, _Mount.getMountPath)() + _core.Registry.getRepository('Config').get('apiPath') + _core.Registry.getRepository('Config').get('modelPath')}/${modelKey}/single/${single}/delete`;
}

/**
 * Get URL to create item of model
 * @param {string} modelKey - Model key
 * @returns {string}
 */
function getLinkApiModelCreate(modelKey) {
  return `${(0, _Mount.getMountPath)() + _core.Registry.getRepository('Config').get('apiPath') + _core.Registry.getRepository('Config').get('modelPath')}/${modelKey}/create`;
}

/**
 * Get URL to update item of model
 * @param {string} modelKey - Model key
 * @param {string} single - Item id of model
 * @returns {string}
 */
function getLinkApiModelSingleUpdate(modelKey, single) {
  return `${(0, _Mount.getMountPath)() + _core.Registry.getRepository('Config').get('apiPath') + _core.Registry.getRepository('Config').get('modelPath')}/${modelKey}/single/${single}/update`;
}