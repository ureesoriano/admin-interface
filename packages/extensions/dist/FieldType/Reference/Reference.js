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
 * Reference FieldType
 * @extends FieldTypeAbstract
 */
class Reference extends _adminInterfaceMnCore.FieldTypeAbstract {
    static getThisPath() {
        return _path2.default.join(__dirname);
    }

    /**
     * Get context
     * @returns {{}}
     */
    context() {
        const reference = this.getSequelizeField().references;

        return (0, _extends3.default)({
            $field: this,
            reference
        }, _adminInterfaceMnCore.Registry.getRepository('Config').get('locals'));
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
exports.default = Reference;
module.exports = exports['default'];