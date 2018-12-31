'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ModelAbstract = require('./ModelAbstract');

var _ModelAbstract2 = _interopRequireDefault(_ModelAbstract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Model Builder
 */
class ModelBuilder {

  /**
   * @param {ModelInterface} model - object abstract model
   */
  constructor(model) {
    this._model = new model();

    if (!(this._model instanceof _ModelAbstract2.default)) {
      throw new TypeError('Expected instance of Model');
    }
  }

  /**
   * Get model
   * @returns {Model}
   */

  /**
   * Instance model
   * @type {Model}
   * @private
   */
  getModel() {
    return this._model;
  }

  /**
   * Set key
   * @param {string} key
   * @returns {ModelBuilder}
   */
  setKey(key) {
    this._model.setKey(key);

    return this;
  }

  /**
   * Build model and get model
   * @returns {Model}
   */
  build() {
    this._model.setFields();
    this._model.setColumns();
    this._model.setTabs();
    this._model.setReferences();

    return this.getModel();
  }
}
exports.default = ModelBuilder;
module.exports = exports['default'];