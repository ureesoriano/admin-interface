'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setConfigEvent = setConfigEvent;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('@admin-interface/core');

var _Config = require('../../Utils/Config/Config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initModels(models) {
    Object.keys(models).map(key => {
        const modelBuilder = new _core.ModelBuilder(models[key].default || models[key]);
        // Add model in registry
        _core.Registry.getRepository('Model').set(key, modelBuilder.setKey(key).getModel());
        return modelBuilder;
    }).map((modelBuilder
    // Build model by reference
    ) => modelBuilder.build());
}


function initPages(pages) {
    Object.keys(pages).forEach(key => {
        const page = new (pages[key].default || pages[key])();
        // Add page in registry
        _core.Registry.getRepository('Page').set(key, page.setKey(key));
    });
}

function initMenus(menus) {
    Object.keys(menus).forEach(key => {
        _core.Registry.getRepository('Menu').set(key, (0, _core.menuParser)(menus[key], key));
    });
}

function initFieldTypes(fieldTypes) {
    Object.keys(fieldTypes).map(key => _core.Registry.getRepository('FieldType').set(key, fieldTypes[key]));
}

function initConfig(config) {
    Object.keys(config).forEach(key => _core.Registry.getRepository('Config').set(key, config[key]));
}

function initWidgets(widgets) {
    Object.keys(widgets).forEach(key => {
        const widget = widgets[key];
        // Add widget in registry
        _core.Registry.getRepository('Widget').set(key, widget);
    });
}

function setConfigEvent(config) {
    const localConfig = (0, _Config.getLocalConfig)();
    if (config.Config || localConfig.Config) {
        initConfig(_lodash2.default.merge(localConfig.Config, config.Config));
    }

    if (config.Menu) {
        initMenus(config.Menu);
    }

    if (config.FieldType || localConfig.FieldType) {
        initFieldTypes(_lodash2.default.merge(localConfig.FieldType, config.FieldType));
    }

    if (config.Widget || localConfig.Widget) {
        initWidgets(_lodash2.default.merge(config.Widget, localConfig.Widget));
    }

    if (config.Model) {
        initModels(config.Model);
    }

    if (config.Page || localConfig.Page) {
        initPages(_lodash2.default.merge(localConfig.Page, config.Page));
    }
}