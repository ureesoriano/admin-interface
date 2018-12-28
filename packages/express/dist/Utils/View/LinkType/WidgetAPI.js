'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinkApiWidget = getLinkApiWidget;

var _core = require('@admin-interface/core');

var _Mount = require('../../Mount/Mount');

/**
 * Get URL to Widget API
 * @param {string} widgetKey
 * @param {string} routeKey
 * @returns {string}
 */
/**
 * @module src/Utils/View/LinkType/ModelView
 * 
 */
function getLinkApiWidget(widgetKey, routeKey) {
  const routing = _core.Registry.getRepository('Widget').get(widgetKey).getRouting();
  if (routing) {
    return `${(0, _Mount.getMountPath)() + _core.Registry.getRepository('Config').get('apiPath') + _core.Registry.getRepository('Config').get('widgetPath')}/${widgetKey + routing[routeKey].route}`;
  }
  return '';
}