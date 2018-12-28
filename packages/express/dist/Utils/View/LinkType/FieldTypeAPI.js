'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinkApiFieldType = getLinkApiFieldType;

var _core = require('@admin-interface/core');

var _Mount = require('../../Mount/Mount');

/**
 * Get URL to FieldType API
 * @param {string} fieldKey
 * @param {string} routeKey
 * @returns {string}
 */
/**
 * @module src/Utils/View/LinkType/ModelView
 * 
 */
function getLinkApiFieldType(fieldKey, routeKey) {
  const routing = _core.Registry.getRepository('FieldType').get(fieldKey).getRouting();
  if (routing) {
    return `${(0, _Mount.getMountPath)() + _core.Registry.getRepository('Config').get('apiPath') + _core.Registry.getRepository('Config').get('fieldPath')}/${fieldKey + routing[routeKey].route}`;
  }
  return '';
}