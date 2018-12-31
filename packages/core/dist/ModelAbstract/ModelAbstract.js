'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FieldFactory = require('../FieldFactory/FieldFactory');

var _FieldFactory2 = _interopRequireDefault(_FieldFactory);

var _Registry = require('../Registry/Registry');

var _Registry2 = _interopRequireDefault(_Registry);

var _Column = require('../Column/Column');

var _Column2 = _interopRequireDefault(_Column);

var _Tab = require('../Tab/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Model Abstract class
 */
class ModelAbstract {
    constructor() {
        this._fields = [];
        this._columns = [];
        this._tabs = [];
        this._references = [];
    }
    /**
     * Model key
     * @type {string}
     * @private
     */

    /**
     * Fields
     * @type {Array<FieldType>}
     * @private
     */

    /**
     * Columns
     * @type {Array<Column>}
     * @private
     */

    /**
     * Tabs
     * @type {Array<Tab>}
     * @private
     */

    /**
     * References
     * @type {Array<string>}
     * @private
     */


    /**
     * Abstract method.
     * Get Sequelize model
     * @returns {SequelizeModel}
     * @abstract
     */
    getModel() {
        // eslint-disable-line class-methods-use-this
        throw new TypeError('The getModel abstract method');
    }

    /**
     * Get model key
     * @return {string}
     */
    getKey() {
        return this._key;
    }

    /**
     * Set model key
     * @param key
     * @return {ModelAbstract}
     */
    setKey(key) {
        if (typeof key === 'string') {
            this._key = key;
        } else {
            throw new Error('key not string');
        }
        return this;
    }

    /**
     * Set field
     * @param {FieldType} field
     * @returns {ModelAbstract}
     */
    setField(field) {
        this._fields.push(field);
        return this;
    }

    /**
     * Get all fields
     * @returns {Array<FieldType>}
     */
    getFields() {
        return this._fields;
    }

    /**
     * Get field by key
     * @param {string} key - field key
     * @param {Array<FieldType>} registry
     * @returns {FieldType|void}
     */
    getFieldByKey(key, registry) {
        if (registry && registry.length) {
            return _lodash2.default.find(registry, ['field', key]);
        }
        return _lodash2.default.find(this.getFields(), ['field', key]);
    }

    /**
     * Set column
     * @param {Column} column
     * @returns {ModelAbstract}
     */
    setColumn(column) {
        if (column instanceof _Column2.default) {
            this._columns.push(column);
        }
        return this;
    }

    /**
     * Get columns
     * @returns {Array<Column>}
     */
    getColumns() {
        return this._columns;
    }

    /**
     * Set tab
     * @param {Tab} tab
     * @returns {ModelAbstract}
     */
    setTab(tab) {
        if (tab instanceof _Tab2.default) {
            this._tabs.push(tab);
        }
        return this;
    }

    /**
     * Get tabs
     * @returns {Array<Tab>}
     */
    getTabs() {
        return this._tabs;
    }

    /**
     * Set reference
     * @param {string} reference
     * @returns {ModelAbstract}
     */
    setReference(reference) {
        if (typeof reference === 'string' && _Registry2.default.getRepository('Model').has(reference)) {
            this._references.push(reference);
        }
        return this;
    }

    /**
     * Get references
     * @returns {Array<string>}
     */
    getReferences() {
        return this._references;
    }

    /**
     * Show actions button
     * @returns {boolean}
     */
    isShowActions() {
        // eslint-disable-line class-methods-use-this
        return true;
    }

    /**
     * Get primary key
     * @returns {string|null}
     */
    getPrimaryKey() {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in this.getModel().attributes) {
            if (this.getModel().attributes.hasOwnProperty(key)) {
                if (_lodash2.default.hasIn(this.getModel().attributes[key], 'primaryKey')) {
                    return key;
                }
            }
        }
        return null;
    }

    /**
     * Get singular model name
     * @returns {string}
     */
    getNameSingular() {
        return this.getModel().options.name.singular;
    }

    /**
     * Get plural model name
     * @returns {string}
     */
    getNamePlural() {
        return this.getModel().options.name.plural;
    }

    /**
     * Get strategy for fields
     * @returns {Array<FieldFactory>}
     */
    getFieldsStrategy() {
        // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Get strategy for columns
     * @returns {Array<Column>}
     */
    getColumnsStrategy() {
        // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Get strategy for tabs
     * @returns {Array<Tab>}
     */
    getTabsStrategy() {
        // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Get reference strategy
     * @returns {Array<string>} - models keys
     */
    getReferencesStrategy() {
        // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Get fields from sequelize attributes
     * @returns {Array<FieldType>}
     */
    getFieldsFromAttributes() {
        return Object.keys(this.getModel().attributes).map(key => {
            const sequelizeField = this.getModel().attributes[key];

            return new _FieldFactory2.default(key, _lodash2.default.capitalize(sequelizeField.type.constructor.name)).setModelKey(this.getKey()).setSequelizeField(sequelizeField).setTitle(_lodash2.default.startCase(sequelizeField.fieldName)).setDisable(this.getPrimaryKey() === key).setDefaultValue(sequelizeField.defaultValue || '').getField();
        });
    }

    /**
     * Build Fields
     */
    buildFields() {
        this.getFieldsFromAttributes().forEach(fieldType => this.setField(fieldType));
    }

    /**
     * Build fields from user strategy
     */
    buildFieldsByStrategy() {
        this.getFieldsStrategy().forEach(fieldObject => {
            const sequelizeField = this.getModel().attributes[fieldObject.getFieldKey()];
            const field = fieldObject.setSequelizeField(sequelizeField).setModelKey(this.getKey()).getField();

            this.setField(field);
        });
    }

    /**
     * Set fields.
     * Protected method
     */
    setFields() {
        if (this.getFieldsStrategy().length) {
            return this.buildFieldsByStrategy();
        }
        return this.buildFields();
    }

    /**
     * Build columns
     */
    buildColumns() {
        this.getFieldsFromAttributes().forEach(fieldType => {
            const _fieldType = this.getFieldByKey(fieldType.field, this.getFieldsFromAttributes());
            const column = new _Column2.default();
            column.setField(fieldType.field);

            if (_fieldType) {
                column.setTitle(_fieldType.type.getTitle());
            }

            this.setColumn(column);
        });
    }

    /**
     * Build columns from user strategy
     */
    buildColumnsFromStrategy() {
        this.getColumnsStrategy().forEach(column => this.setColumn(column));
    }

    /**
     * Set columns.
     * Protected method
     */
    setColumns() {
        if (this.getColumnsStrategy().length) {
            return this.buildColumnsFromStrategy();
        }
        return this.buildColumns();
    }

    /**
     * Set tabs.
     * Protected method
     */
    setTabs() {
        const tabs = this.getTabsStrategy();
        if (tabs.length) {
            tabs.forEach(tab => this.setTab(tab));
        }
    }

    /**
     * Set references.
     * Protected method
     */
    setReferences() {
        const references = this.getReferencesStrategy();
        if (references) {
            references.forEach(reference => this.setReference(reference));
        }
    }
}

exports.default = ModelAbstract;
module.exports = exports['default'];