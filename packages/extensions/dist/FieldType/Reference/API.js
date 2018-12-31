'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('@admin-interface/core');

var _sequelize = require('sequelize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reference API Controller.
 */
const Controller = {
    /**
     * API Action.
     * Get selected item
     * @param {express$Request} req
     * @param {express$Response} res
     * @param {express$NextFunction} next
     * @returns {Promise.<void>}
     */
    getSelected(req, res, next) {
        return (0, _asyncToGenerator3.default)(function* () {
            const reference = JSON.parse(req.query.reference);
            const Model = _lodash2.default.find(_core.Registry.getRepository('Model').get(), function (model) {
                return model.getModel().tableName === reference.model;
            });

            if (Model) {
                const key = reference.key || Model.getPrimaryKey();
                if (key) {
                    try {
                        const item = yield Model.getModel().findOne({
                            where: {
                                [key]: req.query.selected
                            }
                        });

                        return res.json({
                            text: item[req.query.label],
                            value: item[key]
                        });
                    } catch (err) {
                        return next(err);
                    }
                }
            }
            return next();
        })();
    },

    getItems(req, res, next) {
        return (0, _asyncToGenerator3.default)(function* () {
            const reference = JSON.parse(req.query.reference);
            const search = req.query.q || '';
            const Model = _lodash2.default.find(_core.Registry.getRepository('Model').get(), function (model) {
                return model.getModel().tableName === reference.model;
            });

            if (Model) {
                const key = req.query.key || Model.getPrimaryKey();
                if (key) {
                    const label = req.query.label !== 'undefined' ? req.query.label : key;
                    try {
                        const items = yield Model.getModel().findAll({
                            limit: 10,
                            where: {
                                [_sequelize.Op.or]: {
                                    [label]: {
                                        [_sequelize.Op.like]: `%${search}%`
                                    },
                                    [key]: {
                                        [_sequelize.Op.like]: `${search}`
                                    }
                                }
                            }
                        });

                        const result = items.map(function (field) {
                            return {
                                text: field[label],
                                value: field[key]
                            };
                        });

                        return res.json(result);
                    } catch (err) {
                        return next(err);
                    }
                }
            }
            return next();
        })();
    }
};
exports.default = Controller;
module.exports = exports['default'];