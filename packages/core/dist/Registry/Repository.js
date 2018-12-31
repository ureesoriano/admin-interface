'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectPath = require('object-path');

var _objectPath2 = _interopRequireDefault(_objectPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Repository
 */
class Repository {
  constructor() {
    this._registry = (0, _objectPath2.default)({});
  }

  /**
   * Set value
   * @param {string} key
   * @param {*} value
   * @return {Repository}
   */
  set(key, value) {
    this._registry.set(key, value);
    return this;
  }

  /**
   * Get value
   * @param {string} key
   * @return {*}
   */
  get(key) {
    return this._registry.get(key);
  }

  /**
   * Push value
   * @param {string} key
   * @param {*} value
   * @return {Repository}
   */
  push(key, value) {
    this._registry.push(key, value);
    return this;
  }

  /**
   * Check has value
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return !!this.get(key);
  }
}
exports.default = Repository;
module.exports = exports['default'];