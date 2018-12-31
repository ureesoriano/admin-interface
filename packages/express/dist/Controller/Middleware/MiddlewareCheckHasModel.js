'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkHasModel = checkHasModel;
exports.checkHasRefModel = checkHasRefModel;

var _adminInterfaceMnCore = require('admin-interface-mn-core');

var _ErrorResponse = require('../../Utils/ErrorResponse/ErrorResponse');

var _ErrorResponse2 = _interopRequireDefault(_ErrorResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkHasModel(req, res, next) {
    const modelKey = req.params.model_key;
    if (!_adminInterfaceMnCore.Registry.getRepository('Model').has(modelKey)) {
        // if exist a model
        return next(new _ErrorResponse2.default(`Not found Model by key ${modelKey}`, 404));
    }
    return next();
}

function checkHasRefModel(req, res, next) {
    const modelKey = req.params.model_key;
    const refModelKey = req.query.refModel;

    if (refModelKey) {
        // if exist a reference model
        const RefModel = _adminInterfaceMnCore.Registry.getRepository('Model').get(refModelKey);
        if (RefModel && RefModel.getReferences().indexOf(modelKey) === false) {
            return next(new _ErrorResponse2.default(`Not found Reference Model by key ${modelKey}`, 404));
        }
    }
    return next();
}