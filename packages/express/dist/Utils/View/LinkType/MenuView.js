'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLinkListByContext = getLinkListByContext;

var _ModelView = require('./ModelView');

var _PageView = require('./PageView');

/**
 * Get url to list from context menu item
 * @param {ContextType} context
 * @returns {string}
 */
function getLinkListByContext(context) {
    switch (context.type) {
        case 'Model':
            return (0, _ModelView.getLinkModelList)(context.key);
        case 'Page':
            return (0, _PageView.getLinkPage)(context.key);
        default:
            return '';
    }
} /**
   * @module src/Utils/View/LinkType/MenuView
   * 
   */