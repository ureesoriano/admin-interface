'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _adminInterfaceMnCore = require('admin-interface-mn-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Controller
 */
const Controller = {
    /**
     * Get models information: list url and count
     * @param {express$Request} req
     * @param {express$Response} res
     */
    getModelsInfo(req, res) {
        return (0, _asyncToGenerator3.default)(function* () {
            const modelsKey = JSON.parse(req.query.models);
            const promises = modelsKey.map((() => {
                var _ref = (0, _asyncToGenerator3.default)(function* (modelKey) {
                    const Model = _adminInterfaceMnCore.Registry.getRepository('Model').get(modelKey);
                    if (Model) {
                        const count = yield Model.getModel().count();
                        return { count, model: modelKey };
                    }
                });

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            })());

            Promise.all(promises).then(function (result) {
                return res.json(result);
            });
        })();
    }
};
exports.default = Controller;
module.exports = exports['default'];