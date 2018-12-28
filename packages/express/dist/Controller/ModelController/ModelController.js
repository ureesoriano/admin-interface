'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSingleModel = undefined;

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Get single page
 * @async
 * @function
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @returns {Promise.<express$Response>}
 */
let getSingleModel = exports.getSingleModel = (() => {
    var _ref = (0, _asyncToGenerator3.default)(function* (req, res, next) {
        const modelKey = req.params.model_key;
        const itemId = req.params.id;
        const Model = _core.Registry.getRepository('Model').get(modelKey);

        if (Model) {
            const References = Model.getReferences().map(function (reference) {
                return _core.Registry.getRepository('Model').get(reference);
            });

            try {
                const item = yield Model.getModel().findById(itemId);

                if (!item) {
                    return next(new _ErrorResponse2.default(`Not found item by id: ${itemId}`, 404));
                }

                return res.render('model/single', {
                    Model,
                    References,
                    item
                });
            } catch (err) {
                next(err);
            }
        }
        return next(new _ErrorResponse2.default(`Not found Model by key ${modelKey}`, 404));
    });

    return function getSingleModel(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
})();

exports.getList = getList;

var _core = require('@admin-interface/core');

var _ErrorResponse = require('../../Utils/ErrorResponse/ErrorResponse');

var _ErrorResponse2 = _interopRequireDefault(_ErrorResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get list page
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @return {express$Response}
 */
/**
 * @module src/Controller/ModelController/ModelController
 * 
 */
function getList(req, res, next) {
    const modelKey = req.params.model_key;
    const Model = _core.Registry.getRepository('Model').get(modelKey);

    if (Model) {
        try {
            return res.render('model/list', {
                Model
            });
        } catch (err) {
            next(err);
        }
    }
    return next(new _ErrorResponse2.default(`Not found Model by key ${modelKey}`, 404));
}