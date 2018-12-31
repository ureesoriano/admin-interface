'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.menuParser = menuParser;


/**
 * Get content for menu item
 * @param {string|ContextType} context
 * @param {string} key
 * @returns {ContextType}
 */
function getContext(context, key) {
    if (typeof context === 'string') {
        const parse = context.split('.');
        if ((parse[0] === 'Model' || parse[0] === 'Page') && parse[1]) {
            return {
                type: parse[0],
                key: parse[1]
            };
        }
        throw new TypeError(`Not right key context for menu item the ${key}`);
    }
    throw new TypeError(`Not specified context for menu item the ${key}`);
}

/**
 * Parser menu item
 * @param {{ MenuItemType }} items
 * @returns {{MenuItemType}}
 */
/**
 * @module src/Utils/Menu/Parser
 * 
 */
function menuItemParser(items) {
    const result = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key in items) {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
            const menuItem = items[key];
            menuItem.context = getContext(menuItem.context, key);

            if (!menuItem.title) {
                menuItem.title = key;
            }
            if (!menuItem.icon) {
                menuItem.icon = 'folder';
            }
            if (menuItem.children) {
                menuItem.children = menuItemParser(menuItem.children);
            }
            result[key] = menuItem;
        }
    }

    return result;
}

/**
 * Parser menu object
 * @param {MenuType} _menu
 * @param {string} key
 * @returns {{MenuType}}
 */
function menuParser(_menu, key) {
    const menu = _menu;
    if (!menu.title) {
        menu.title = key;
    }
    menu.items = menuItemParser(menu.items);

    return menu;
}