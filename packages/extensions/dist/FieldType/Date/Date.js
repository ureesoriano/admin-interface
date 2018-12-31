'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jade = require('jade');

var _jade2 = _interopRequireDefault(_jade);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _adminInterfaceMnCore = require('admin-interface-mn-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Date FieldType
 * @extends FieldTypeAbstract
 */
class Date extends _adminInterfaceMnCore.FieldTypeAbstract {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this._options = {
            format: 'YYYY-MM-DD hh:mm:ss',
            time: true,
            date: true
        }, _temp;
    }

    static getThisPath() {
        return _path2.default.join(__dirname);
    }

    /**
     * Render FieldType
     * @param {{}} itemObject
     * @returns {string}
     */
    render(itemObject) {
        const value = itemObject ? (0, _moment2.default)(this.getValueFromObject(itemObject)).format(this.getOptions().format) : '';

        const context = (0, _extends3.default)({
            value
        }, this.context());
        return _jade2.default.renderFile(this.constructor.getThisPathView(), context);
    }
}

exports.default = Date;
module.exports = exports['default'];