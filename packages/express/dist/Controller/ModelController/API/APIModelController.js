'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postApiCreateSingleModel = exports.deleteSingleModel = exports.putUpdateSingleModel = exports.getApiList = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Get list item
 * @async
 * @function
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @returns {Promise.<*>}
 */
let getApiList = exports.getApiList = (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        const modelKey = req.params.model_key;

        const Model = _core.Registry.getRepository('Model').get(modelKey);
        if (Model) {
            const Columns = Model.getColumns();

            const refModel = req.query.refModel;
            const refModelKey = req.query.refModelKey;

            const dataTableColumns = req.query.columns;
            const dataTableOrder = req.query.order;

            // Reference
            const byReference = {
                table: '',
                value: refModelKey
            };
            if (refModel) {
                const refModelObject = _core.Registry.getRepository('Model').get(refModel);
                if (refModelObject) {
                    byReference.table = refModelObject.getModel().tableName;
                }
            }

            // Search string
            const search = dataTableColumns.filter(function (e) {
                return e.search.value;
            }).map(function (e) {
                return { column: +e.data, value: e.search.value };
            });

            // Order params
            const orderBy = dataTableOrder[0];
            const order = (0, _core.formatOrder)(Columns[orderBy.column], orderBy.dir.toLocaleUpperCase());

            // Pagination params
            const query = {
                limit: +req.query.length || 10,
                offset: +req.query.start || 0
            };

            try {
                // Reference where
                const whereByReference = (0, _core.getReferenceWhere)(Model, byReference);
                // Get items
                const { rows, count } = yield Model.getModel().findAndCountAll((0, _core.formatQueryModelList)(Model, order, query, search, whereByReference));
                // Records total
                const recordsTotal = yield Model.getModel().count(whereByReference ? {
                    where: whereByReference
                } : null);
                const itemsArrayPromise = rows.map(function (_item) {
                    const item = _item.get();
                    const fields = Columns.map((() => {
                        var _ref2 = (0, _asyncToGenerator3.default)(function* (column) {
                            // reference
                            if (column.getReferenceKey() && item[column.getReference()]) {
                                return item[column.getReference()][column.getReferenceKey()];
                            }
                            // value
                            if (!column.isEmptyValue()) {
                                const value = yield column.getValue(item);
                                return value;
                            }
                            // model field
                            return item[column.getField()];
                        });

                        return function (_x4) {
                            return _ref2.apply(this, arguments);
                        };
                    })());

                    // Add data for action buttons
                    if (Model.isShowActions()) {
                        fields.push((0, _ModelView.getLinkModelSingle)(Model.getKey(), item[Model.getPrimaryKey()]));
                        fields.push((0, _ModelAPI.getLinkApiModelDelete)(Model.getKey(), item[Model.getPrimaryKey()]));
                    }

                    return fields;
                });

                const itemsArray = yield Promise.all(itemsArrayPromise.map(function (item) {
                    return Promise.all(item);
                }));

                return res.json({
                    data: itemsArray,
                    draw: req.query.draw,
                    recordsFiltered: count,
                    recordsTotal
                });
            } catch (err) {
                return next(err);
            }
        }
        return next(new _ErrorResponse2.default(`Not found Model by key ${modelKey}`, 404, true));
    });

    return function getApiList(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
})();

/**
 * Update a item of model
 * @async
 * @function
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
/**
 * @module src/Controller/ModelController/API/APIModelController
 * 
 */


let putUpdateSingleModel = exports.putUpdateSingleModel = (() => {
    var _ref3 = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        const modelKey = req.params.model_key;
        const itemId = req.params.id;
        const body = req.body;
        const Model = _core.Registry.getRepository('Model').get(modelKey);

        if (Model) {
            // Filter body
            const fields = {};
            Object.keys(body).forEach(function (key) {
                if (Model.getFieldByKey(key)) {
                    fields[key] = body[key];
                }
            });

            try {
                // Get item
                const item = yield Model.getModel().findById(itemId);

                if (!item) {
                    return next(new _ErrorResponse2.default(`Not found item by id: ${itemId}`, 404, true));
                }

                // Update item
                const updatedStatus = yield item.update(fields);

                // Send status
                res.json(updatedStatus);
            } catch (err) {
                return next(err);
            }
        }
        return next(new _ErrorResponse2.default(`Not found Model by key ${modelKey}`, 404, true));
    });

    return function putUpdateSingleModel(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
    };
})();

/**
 * Delete single item of model
 * @async
 * @function
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @returns {Promise.<*>}
 */


let deleteSingleModel = exports.deleteSingleModel = (() => {
    var _ref4 = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        const modelKey = req.params.model_key;
        const itemId = req.params.id;
        const Model = _core.Registry.getRepository('Model').get(modelKey);

        if (Model) {
            try {
                const primaryKey = Model.getPrimaryKey();
                if (primaryKey) {
                    const deleteStatus = yield Model.getModel().destroy({
                        where: { [primaryKey]: itemId }
                    });

                    if (!deleteStatus) {
                        return next(new _ErrorResponse2.default(`Not found item by id: ${itemId}`, 404, true));
                    }

                    const redirect = (0, _ModelView.getLinkModelList)(Model.getKey());

                    return res.json({
                        deleteStatus,
                        redirect
                    });
                }
                return next(new _ErrorResponse2.default(`Primary Key not found by model key: ${modelKey}`, 500, true));
            } catch (err) {
                return next(err);
            }
        }
        return next(new _ErrorResponse2.default(`Not found Model by key ${modelKey}`, 404, true));
    });

    return function deleteSingleModel(_x8, _x9, _x10) {
        return _ref4.apply(this, arguments);
    };
})();

/**
 * Create new a item of model
 * @async
 * @function
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @returns {Promise.<*>}
 */


let postApiCreateSingleModel = exports.postApiCreateSingleModel = (() => {
    var _ref5 = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        const modelKey = req.params.model_key;
        const attributes = req.body;
        const Model = _core.Registry.getRepository('Model').get(modelKey);

        if (Model) {
            const primaryKey = Model.getPrimaryKey();
            if (primaryKey) {
                try {
                    // Create a new item
                    const item = yield Model.getModel().create(attributes);
                    // Get link to the item
                    const redirect = (0, _ModelView.getLinkModelSingle)(Model.getKey(), item[Model.getPrimaryKey()]);

                    return res.json({
                        item,
                        redirect
                    });
                } catch (err) {
                    return next(err);
                }
            }
        }
        return next(new _ErrorResponse2.default(`Not found Model by key ${modelKey}`, 404, true));
    });

    return function postApiCreateSingleModel(_x11, _x12, _x13) {
        return _ref5.apply(this, arguments);
    };
})();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('@admin-interface/core');

var _ErrorResponse = require('../../../Utils/ErrorResponse/ErrorResponse');

var _ErrorResponse2 = _interopRequireDefault(_ErrorResponse);

var _ModelView = require('../../../Utils/View/LinkType/ModelView');

var _ModelAPI = require('../../../Utils/View/LinkType/ModelAPI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }