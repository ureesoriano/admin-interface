'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jade = require('jade');

var _jade2 = _interopRequireDefault(_jade);

var _adminInterfaceMnCore = require('admin-interface-mn-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Models Info Widget
 * @extends WidgetAbstract
 */
class ModelsInfoWidget extends _adminInterfaceMnCore.WidgetAbstract {
    static getThisPath() {
        return _path2.default.join(__dirname);
    }

    /**
     * Render widget
     * @return {string}
     */
    render() {
        const { models = [] } = this.getOptions();
        const context = {
            $widget: this,
            models: models.map(modelOption => ({
                model: _adminInterfaceMnCore.Registry.getRepository('Model').get(modelOption.model),
                icon: modelOption.icon || 'folder',
                color: modelOption.color || 'cyan'
            })),
            Link: _adminInterfaceMnCore.Registry.getRepository('Config').get('locals.Link')
        };

        return _jade2.default.renderFile(this.constructor.getThisPathView(), context);
    }
}
exports.default = ModelsInfoWidget;
module.exports = exports['default'];