'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _IColumn = require('./IColumn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Column class
 * @implements IColumn
 */
class Column {
  constructor() {
    this._sorting = true;
  }
  /**
   * Title column
   * @type {string}
   * @private
   */

  /**
   * Is it sorting this column
   * @type {boolean}
   * @private
   */

  /**
   * Model field key
   * @type {string}
   * @private
   */

  /**
   * Reference model key
   * @type {strong}
   * @private
   */

  /**
   * Reference model key item
   * @type {string}
   * @private
   */

  /**
   * Static value
   * @type {*}
   * @private
   */


  /**
   * Set title column
   * @param {string} title
   * @returns {Column}
   */
  setTitle(title) {
    if (typeof title === 'string') {
      this._title = title;
    }
    return this;
  }

  /**
   * Get title column
   * @returns {string}
   */
  getTitle() {
    return this._title;
  }

  /**
   * Set the sorting
   * @param {boolean} sorting
   * @returns {Column}
   */
  setSorting(sorting = true) {
    if (typeof sorting === 'boolean') {
      this._sorting = sorting;
    }
    return this;
  }

  /**
   * Get the sorting
   * @returns {boolean}
   */
  getSorting() {
    return this._sorting;
  }

  /**
   * Set the model field
   * @param {string} field
   * @returns {Column}
   */
  setField(field) {
    if (typeof field === 'string') {
      this._modelField = field;
    }
    return this;
  }

  /**
   * Get the model field
   * @returns {string}
   */
  getField() {
    return this._modelField;
  }

  /**
   * Set the key for reference of model
   * @param {string} reference
   * @returns {Column}
   */
  setReference(reference) {
    if (typeof reference === 'string') {
      this._modelReference = reference;
    }
    return this;
  }

  /**
   * Get the key for reference of model
   * @returns {string}
   */
  getReference() {
    return this._modelReference;
  }

  /**
   * Set the field for reference of model
   * @param key
   * @returns {Column}
   */
  setReferenceKey(key) {
    if (typeof key === 'string') {
      this._modelReferenceKey = key;
    }
    return this;
  }

  /**
   * Get the field for reference of model
   * @returns {string}
   */
  getReferenceKey() {
    return this._modelReferenceKey;
  }

  /**
   * Set the field and reference of model
   * @param {string} key
   * @param {string} reference
   * @returns {Column}
   */
  setReferenceAndKey(key, reference) {
    this.setReferenceKey(key);
    this.setReference(reference);
    return this;
  }

  /**
   * Set the value field
   * @param {*} value
   * @returns {Column}
   */
  setValue(value) {
    // disable sorting
    this.setSorting(false);

    this._value = value;
    return this;
  }

  /**
   * Get the value field
   * @async
   * @param {*} item
   * @returns {Promise.<*>}
   */
  getValue(item) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(function* () {
      if (item && typeof _this._value === 'function') {
        const value = yield _this._value(item);
        return value;
      }
      return _this._value;
    })();
  }

  /**
   * Check is empty value
   * @returns {boolean}
   */
  isEmptyValue() {
    return !this._value;
  }
}
exports.default = Column;
module.exports = exports['default'];