'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Registry = require('../Registry/Registry');

var _Registry2 = _interopRequireDefault(_Registry);

var _WidgetAbstract = require('../WidgetAbstract/WidgetAbstract');

var _WidgetAbstract2 = _interopRequireDefault(_WidgetAbstract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create instance of class WidgetAbstract
 * @param {string} widgetKey
 * @return {WidgetAbstract}
 */
function WidgetFactory(widgetKey) {
    const widget = _Registry2.default.getRepository('Widget').get(widgetKey);
    if (!widget) {
        throw new Error(`Widget not found by key ${widgetKey}`);
    }
    return new widget().setKey(widgetKey);
}

exports.default = WidgetFactory;
module.exports = exports['default'];