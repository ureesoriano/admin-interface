'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Registry = require('../Registry/Registry');

var _Registry2 = _interopRequireDefault(_Registry);

var _FieldTypeAbstract = require('../FieldTypeAbstract/FieldTypeAbstract');

var _FieldTypeAbstract2 = _interopRequireDefault(_FieldTypeAbstract);

require('../ModelAbstract/types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Field Factory class
 */
class FieldFactory {

    /**
     * Constructor FieldFactory
     * @param {string} fieldKey - field key
     * @param {string} type - FieldType key
     */

    /**
     * Field key
     * @type {string}
     * @private
     */
    constructor(fieldKey, type) {
        this.setFieldKey(fieldKey);
        this.setType(type);
    }

    /**
     * Get field
     * @returns {FieldType}
     */

    /**
     * Instance FieldTypeAbstract
     * @type {FieldTypeAbstract}
     * @private
     */
    getField() {
        return {
            field: this.getFieldKey(),
            type: this.getType()
        };
    }

    /**
     * Set model key
     * @param {string} modelKey - model key
     * @returns {FieldFactory}
     */
    setModelKey(modelKey) {
        if (typeof modelKey === 'string') {
            this.getType().setModelKey(modelKey);
        }
        return this;
    }

    /**
     * Set field key
     * @param {string} field - field key
     * @returns {FieldFactory}
     */
    setFieldKey(field) {
        if (typeof field === 'string') {
            this._fieldKey = field;
        }
        return this;
    }

    /**
     * Get field key
     * @returns {string}
     */
    getFieldKey() {
        return this._fieldKey;
    }

    /**
     * Set default value
     * @param {*} defaultValue
     * @returns {FieldFactory}
     */
    setDefaultValue(defaultValue) {
        this.getType().setDefaultValue(defaultValue);
        return this;
    }

    /**
     * Set FieldType by key
     * @param {string} type - FieldType key
     * @returns {FieldFactory}
     */
    setType(type) {
        if (typeof type === 'string') {
            // this._type = new (Registry.getFieldType(type))();
            this._type = new (_Registry2.default.getRepository('FieldType').get(type))();
            this.getType().setKey(type).setField(this.getFieldKey());
        }
        return this;
    }

    /**
     * Get FieldType
     * @returns {FieldTypeAbstract}
     */
    getType() {
        return this._type;
    }

    /**
     * Set title
     * @param {string} title
     * @returns {FieldFactory}
     */
    setTitle(title) {
        if (typeof title === 'string') {
            this.getType().setTitle(title);
        }
        return this;
    }

    /**
     * Set disable
     * @param {boolean} isDisable
     * @returns {FieldFactory}
     */
    setDisable(isDisable) {
        if (typeof isDisable === 'boolean') {
            this.getType().setDisable(isDisable);
        }
        return this;
    }

    /**
     * Set options
     * @param {{}} options
     * @returns {FieldFactory}
     */
    setOptions(options) {
        this.getType().setOptions(options);
        return this;
    }

    /**
     * Set Sequelize field
     * @param sequelizeField
     * @returns {FieldFactory}
     */
    setSequelizeField(sequelizeField) {
        this.getType().setSequelizeField(sequelizeField);
        return this;
    }
}
exports.default = FieldFactory;
module.exports = exports['default'];