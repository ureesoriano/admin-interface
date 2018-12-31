'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tab class
 * @implements ITab
 */
class Tab {
  constructor() {
    this._fields = [];
    this._active = false;
  }
  /**
   * Fields
   * @type {Array<string>}
   * @private
   */

  /**
   * Active tab
   * @type {boolean}
   * @private
   */

  /**
   * Title
   * @type {string}
   * @private
   */

  /**
   * Icon
   * @type {string}
   * @private
   */


  /**
   * Set title
   * @param {string} title
   * @returns {Tab}
   */
  setTitle(title) {
    if (typeof title === 'string') {
      this._title = title;
    }
    return this;
  }

  /**
   * Get title
   * @returns {string}
   */
  getTitle() {
    return this._title;
  }

  /**
   * Set icon
   * @param {string} icon
   * @returns {Tab}
   */
  setIcon(icon) {
    if (typeof icon === 'string') {
      this._icon = icon;
    }
    return this;
  }

  /**
   * Get icon
   * @returns {string}
   */
  getIcon() {
    return this._icon;
  }

  /**
   * Get id of tab
   * @returns {string}
   */
  getId() {
    return _lodash2.default.snakeCase(this.getTitle());
  }

  /**
   * Set fields
   * @param {Array<string>} fields
   * @returns {Tab}
   */
  setFields(fields) {
    if (Array.isArray(fields)) {
      this._fields = fields;
    }
    return this;
  }

  /**
   * Get fields
   * @returns {Array<string>}
   */
  getFields() {
    return this._fields;
  }

  /**
   * Set active
   * @param active
   * @returns {Tab}
   */
  setActive(active = true) {
    if (typeof active === 'boolean') {
      this._active = active;
    }
    return this;
  }

  /**
   * Get active
   * @returns {boolean}
   */
  getActive() {
    return this._active;
  }
}
exports.default = Tab;
module.exports = exports['default'];