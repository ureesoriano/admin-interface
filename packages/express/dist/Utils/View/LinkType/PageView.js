'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinkPage = getLinkPage;

var _core = require('@admin-interface/core');

var _Mount = require('../../Mount/Mount');

/**
 * Get URL to custom page
 * @param {string} key - Page key
 * @returns {string}
 */
/**
 * src/Utils/View/LinkType/PageView
 * 
 */
function getLinkPage(key) {
  const page = _core.Registry.getRepository('Page').get(key);
  if (page) {
    return (0, _Mount.getMountPath)() + page.getUrl();
  }
  return '';
}