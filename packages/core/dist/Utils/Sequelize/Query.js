'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getReferenceWhere = getReferenceWhere;
exports.formatQueryModelList = formatQueryModelList;
exports.formatOrder = formatOrder;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sequelize = require('sequelize');

var _ModelAbstract = require('../../ModelAbstract/ModelAbstract');

var _ModelAbstract2 = _interopRequireDefault(_ModelAbstract);

var _Column = require('../../Column/Column');

var _Column2 = _interopRequireDefault(_Column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get reference "Where" object
 * @param {Model} model
 * @param {DataTableByReference} byReference
 * @returns {{}|null}
 */
/**
 * @module src/Utils/Sequelize/Query
 * 
 */
function getReferenceWhere(model, byReference) {
    if (byReference && byReference.table && byReference.value) {
        const fieldReference = Object.keys(model.getModel().attributes).filter(key => {
            const attribute = model.getModel().attributes[key];
            return attribute.references && attribute.references.model && attribute.references.model === byReference.table;
        });
        if (fieldReference.length) {
            return { [fieldReference[0]]: byReference.value };
        }
    }
    return null;
}

/**
 * Get format query model
 * @param {Model} model
 * @param {Array<Array<*>>} order
 * @param {DataTablePagination} params
 * @param {Array<DataTableSearch>} search
 * @param {{any}|null} byReference
 */
function formatQueryModelList(model, order, params = { limit: 10, offset: 0 }, search, byReference) {
    const query = _lodash2.default.merge({
        attributes: [],
        order,
        include: []
    }, params);
    const modelColumns = model.getColumns();

    // Reference
    if (byReference) {
        query.where = byReference;
    }

    // Connect references
    query.include = _lodash2.default.uniq(modelColumns.filter(column => column.getReference()).map(column => ({
        association: column.getReference(),
        as: column.getReference()
    })));

    // Search
    if (search.length) {
        const whereSearch = {};
        search.forEach(searchParam => {
            const column = modelColumns[searchParam.column];

            // Reference
            if (column.getReference()) {
                query.include = query.include.map(e => {
                    if (e.association === column.getReference()) {
                        e.where = {
                            [column.getReferenceKey()]: {
                                [_sequelize.Op.like]: `${searchParam.value}%`
                            }
                        };
                    }
                    return e;
                });
            } else if (column.getField() && column.isEmptyValue()) {
                whereSearch[column.getField()] = {
                    [_sequelize.Op.like]: `${searchParam.value}%`
                };
            }
        });
        if (Object.keys(whereSearch).length) {
            query.where = _lodash2.default.merge(query.where, { [_sequelize.Op.or]: whereSearch });
        }
    }

    // connect attributes
    query.attributes = modelColumns.filter(column => column.getField() && !column.getReference() && column.isEmptyValue()).map(column => column.getField());

    // set primary key
    const primaryKey = model.getPrimaryKey();
    if (primaryKey && query.attributes.indexOf(primaryKey) === -1) {
        query.attributes.push(primaryKey);
    }

    return query;
}

/**
 * Get format order object
 * @param {Column} column
 * @param {string} orderBy
 * @returns {Array<*>}
 */
function formatOrder(column, orderBy) {
    if (column.getReference()) {
        return [[{
            association: column.getReference(),
            as: column.getReference()
        }, `${column.getReference()}.${column.getReferenceKey()}`, orderBy]];
    }
    return [[column.getField(), orderBy]];
}