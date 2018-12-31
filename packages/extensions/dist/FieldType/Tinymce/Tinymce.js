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

var _core = require('@admin-interface/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tinymce FieldType
 * @extends FieldTypeAbstract
 */
class Tinymce extends _core.FieldTypeAbstract {
    static getThisPath() {
        return _path2.default.join(__dirname);
    }

    /**
     * Format options to attributes
     * @returns {{}}
     */
    formatAttributes() {
        const attributes = {};
        Object.keys(this.getOptions()).forEach(key => {
            attributes[`data-tinymce-${key}`] = this.getOptions()[key];
        });
        return attributes;
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
exports.default = Tinymce;
module.exports = exports['default'];