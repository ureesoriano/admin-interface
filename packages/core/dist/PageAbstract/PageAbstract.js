'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WidgetAbstract = require('../WidgetAbstract/WidgetAbstract');

var _WidgetAbstract2 = _interopRequireDefault(_WidgetAbstract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Page Abstract class
 * @implements IPage
 */
class PageAbstract {

  /**
   * Set page key
   * @param {string} key
   * @returns {PageAbstract}
   */
  setKey(key) {
    if (typeof key === 'string') {
      this._key = key;
    }
    return this;
  }

  /**
   * Get page key
   * @returns {string}
   */

  /**
   * Page key
   * @type {string}
   * @private
   */
  getKey() {
    return this._key;
  }

  /**
   * Get page URL
   * @returns {string}
   */
  getUrl() {
    // eslint-disable-line class-methods-use-this
    throw new Error('Implement the method getUrl');
  }

  /**
   * Get page widgets
   * @returns {Array<WidgetAbstract>}
   */
  getWidgets() {
    // eslint-disable-line class-methods-use-this
    return [];
  }

  /**
   * Render page.
   * Controller
   */
  render(req, res) {
    // eslint-disable-line class-methods-use-this, no-unused-vars
    throw new Error('Method the render is abstract');
  }
}
exports.default = PageAbstract;
module.exports = exports['default'];