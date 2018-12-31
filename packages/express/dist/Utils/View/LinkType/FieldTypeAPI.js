'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinkApiFieldType = getLinkApiFieldType;

var _adminInterfaceMnCore = require('admin-interface-mn-core');

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
  const routing = _adminInterfaceMnCore.Registry.getRepository('FieldType').get(fieldKey).getRouting();
  if (routing) {
    return `${(0, _Mount.getMountPath)() + _adminInterfaceMnCore.Registry.getRepository('Config').get('apiPath') + _adminInterfaceMnCore.Registry.getRepository('Config').get('fieldPath')}/${fieldKey + routing[routeKey].route}`;
  }
  return '';
}