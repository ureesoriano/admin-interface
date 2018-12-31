'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Registry = require('../Registry/Registry');

var _Registry2 = _interopRequireDefault(_Registry);

var _Parser = require('../Utils/Yaml/Parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Field Type Abstract class
 */
class FieldTypeAbstract {
    constructor() {
        this._disabled = false;
        this._options = {};
    }
    /**
     * Key FieldType
     * @type {string}
     * @private
     */

    /**
     * Model key
     * @type {string}
     * @private
     */

    /**
     * Field key
     * @type {string}
     * @private
     */

    /**
     * Default value
     * @type {*}
     * @private
     */

    /**
     * Title
     * @type {string}
     * @private
     */

    /**
     * Is disable field type
     * @type {boolean}
     * @private
     */

    /**
     * Sequelize field
     * @type {*}
     * @private
     */

    /**
     * Extra options
     * @type {{}}
     * @private
     */


    /**
     * Routing cache
     * @type {RoutingType}
     */


    /**
     * Get path
     * @abstract
     */
    static getThisPath() {
        throw new Error('Method the getThisPath is abstract');
    }

    /**
     * Get path to view
     * @type {string}
     */
    static getThisPathView() {
        return _path2.default.join(this.getThisPath(), 'view.jade');
    }

    /**
     * Get routing
     * @returns {RoutingType|null}
     */
    static getRouting() {
        const routingPath = `${this.getThisPath()}/routing.yaml`;
        if (this._routingCache) {
            return this._routingCache;
        }

        if (_fs2.default.existsSync(routingPath)) {
            const routing = (0, _Parser.yamlConfigRoutingParser)(this.getThisPath(), 'routing.yaml');
            // save routing
            this._routingCache = routing;
            return routing;
        }
        return null;
    }

    /**
     * Set key
     * @param {string} key
     * @returns {FieldTypeAbstract}
     */
    setKey(key) {
        if (typeof key === 'string') {
            this._key = key;
        }
        return this;
    }

    /**
     * Get key
     * @returns {string}
     */
    getKey() {
        return this._key;
    }

    /**
     * Set model key
     * @param {string} modelKey
     * @returns {FieldTypeAbstract}
     */
    setModelKey(modelKey) {
        if (typeof modelKey === 'string') {
            this._modelKey = modelKey;
        }
        return this;
    }

    /**
     * Get model key
     * @returns {string}
     */
    getModelKey() {
        return this._modelKey;
    }

    /**
     * Set default value
     * @param {*} defaultValue
     * @returns {FieldTypeAbstract}
     */
    setDefaultValue(defaultValue) {
        this._defaultValue = defaultValue;
        return this;
    }

    /**
     * Get default value
     * @returns {any}
     */
    getDefaultValue() {
        return this._defaultValue;
    }

    /**
     * Set title
     * @param {string} title
     * @returns {FieldTypeAbstract}
     */
    setTitle(title = '') {
        if (typeof title === 'string') {
            this._title = title;
        } else {
            throw new TypeError('Expected string value');
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
     * Set field
     * @param {string} field
     * @returns {FieldTypeAbstract}
     */
    setField(field) {
        if (typeof field === 'string') {
            this._field = field;
        }
        return this;
    }

    /**
     * get filed
     * @returns {string}
     */
    getField() {
        return this._field;
    }

    /**
     * Set disable
     * @param {boolean} disable
     * @returns {FieldTypeAbstract}
     */
    setDisable(disable = false) {
        if (typeof disable === 'boolean') {
            this._disabled = disable;
        }
        return this;
    }

    /**
     * Get disable
     * @returns {boolean}
     */
    getDisable() {
        return this._disabled;
    }

    /**
     * Is disable
     * @returns {boolean}
     */
    isDisabled() {
        return this.getDisable();
    }

    /**
     * Set options
     * @param {{}} options - Object of options
     * @returns {FieldTypeAbstract}
     */
    setOptions(options) {
        if (typeof options === 'object') {
            this._options = _lodash2.default.merge(this.getOptions(), options);
        }
        return this;
    }

    /**
     * Get options
     * @returns {{}}
     */
    getOptions() {
        return this._options;
    }

    /**
     * Set Sequelize field
     * @param {*} sequelizeField
     * @returns {FieldTypeAbstract}
     */
    setSequelizeField(sequelizeField) {
        this._sequelizeField = sequelizeField;
        return this;
    }

    /**
     * Get Sequelize field
     * @returns {*}
     */
    getSequelizeField() {
        return this._sequelizeField;
    }

    /**
     * Get context
     * @returns {{}}
     */
    context() {
        return (0, _extends3.default)({
            $field: this
        }, _Registry2.default.getRepository('Config').get('locals'));
    }

    getValueFromObject(itemObject) {
        return itemObject ? itemObject[this.getField()] : null;
    }

    /**
     * Render FieldType
     * @param {{}} itemObject
     * @returns {string}
     */
    render(itemObject) {
        // eslint-disable-line class-methods-use-this, no-unused-vars
        throw new Error('Method the render is abstract');
    }
}
exports.default = FieldTypeAbstract;
module.exports = exports['default'];