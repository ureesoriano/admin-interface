'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _core = require('@admin-interface/core');

/**
 * Home Page
 * @extends PageAbstract
 */
class HomePage extends _core.PageAbstract {
    /**
     * Get page URL
     * @returns {string}
     */
    getUrl() {
        // eslint-disable-line class-methods-use-this
        return '/';
    }

    /**
     * Get page widgets
     * @returns {Array<WidgetAbstract>}
     */
    getWidgets() {
        // eslint-disable-line class-methods-use-this
        return [(0, _core.WidgetFactory)('ModelsInfoWidget').setTitle('Models Info Widget').setOptions({
            models: Object.keys(_core.Registry.getRepository('Model').get()).map(key => ({
                model: key
            }))
        })];
    }

    /**
     * Render page.
     * Express controller
     * @param {express$Request} req
     * @param {express$Response} res
     */
    render(req, res) {
        res.render('pages/main', {
            $page: this
        });
    }
}
exports.default = HomePage;
module.exports = exports['default'];