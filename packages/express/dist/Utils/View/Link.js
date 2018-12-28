'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _FieldTypeAPI = require('./LinkType/FieldTypeAPI');

var _MenuView = require('./LinkType/MenuView');

var _ModelView = require('./LinkType/ModelView');

var _WidgetAPI = require('./LinkType/WidgetAPI');

var _ModelAPI = require('./LinkType/ModelAPI');

exports.default = {
    getLinkModelList: _ModelView.getLinkModelList,
    getLinkListByContext: _MenuView.getLinkListByContext,
    getLinkApiModelList: _ModelAPI.getLinkApiModelList,
    getLinkModelSingle: _ModelView.getLinkModelSingle,
    getLinkApiModelSingleUpdate: _ModelAPI.getLinkApiModelSingleUpdate,
    getLinkApiModelDelete: _ModelAPI.getLinkApiModelDelete,
    getLinkApiModelCreate: _ModelAPI.getLinkApiModelCreate,
    getLinkApiWidget: _WidgetAPI.getLinkApiWidget,
    getLinkApiFieldType: _FieldTypeAPI.getLinkApiFieldType
}; /**
    * @module src/Utils/View/Link
    * 
    */

module.exports = exports['default'];