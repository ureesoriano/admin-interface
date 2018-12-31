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

var _adminInterfaceMnCore = require('admin-interface-mn-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Textarea FieldType
 * @extends FieldTypeAbstract
 */
class Textarea extends _adminInterfaceMnCore.FieldTypeAbstract {
    constructor(...args) {
        var _temp;

        return _temp = super(...args), this._options = {
            rows: 4
        }, _temp;
    }
    /**
     * @private
     */


    static getThisPath() {
        return _path2.default.join(__dirname);
    }

    /**
     * Render FieldType
     * @param {{}} itemObject
     * @returns {string}
     */
    render(itemObject) {
        const value = itemObject ? this.getValueFromObject(itemObject) : this.getDefaultValue();
        const context = (0, _extends3.default)({
            value
        }, this.context());

        return _jade2.default.renderFile(this.constructor.getThisPathView(), context);
    }
}
exports.default = Textarea;
module.exports = exports['default'];