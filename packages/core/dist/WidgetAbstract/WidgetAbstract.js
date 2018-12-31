'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jade = require('jade');

var _jade2 = _interopRequireDefault(_jade);

var _Registry = require('../Registry/Registry');

var _Registry2 = _interopRequireDefault(_Registry);

var _Parser = require('../Utils/Yaml/Parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Widget Abstract
 * @implements WidgetAbstractInterface
 */
class WidgetAbstract {
    constructor() {
        this._options = {};
    }
    /**
     * Widget key
     * @type {string}
     * @private
     */


    /**
     * Widget title
     * @type {string}
     * @private
     */


    /**
     * Widget options
     * @type {{}}
     * @private
     */


    /**
     * Routing cache object
     * @return {RoutingType}
     */


    /**
     * Get path of this widget
     * @return {string}
     */
    static getThisPath() {
        throw new Error('Method the getThisPath is abstract');
    }

    /**
     * Get path to a file view
     * @return {string}
     */
    static getThisPathView() {
        return _path2.default.join(this.getThisPath(), 'view.jade');
    }

    /**
     * Get routing this widget from a file routing.yaml
     * @return {RoutingType|null}
     */
    static getRouting() {
        const routingPath = `${this.getThisPath()}/routing.yaml`;
        if (this._routingCache) {
            return this._routingCache;
        }

        if (_fs2.default.existsSync(routingPath)) {
            const routing = (0, _Parser.yamlConfigRoutingParser)(this.getThisPath(), 'routing.yaml');
            // Save routing
            this._routingCache = routing;
            return routing;
        }
        return null;
    }

    /**
     * Get key
     * @param  {string} key
     * @returns {WidgetAbstract}
     */
    setKey(key) {
        if (typeof key === 'string') {
            this._key = key;
        }
        return this;
    }

    /**
     * Get key
     * @return {string}
     */
    getKey() {
        return this._key;
    }

    /**
     * Set title
     * @param {string} title
     * @return {WidgetAbstract}
     */
    setTitle(title) {
        if (typeof title === 'string') {
            this._title = title;
        }
        return this;
    }

    /**
     * Get title
     * @return {string}
     */
    getTitle() {
        return this._title;
    }

    /**
     * Set options
     * @param {Object} options
     * @return {WidgetAbstract}
     */
    setOptions(options = {}) {
        if (typeof options === 'object') {
            this._options = options;
        }
        return this;
    }

    /**
     * Get options
     * @return {Object}
     */
    getOptions() {
        return this._options;
    }

    /**
     * Get option by key
     * @param {string} key - key of option
     * @return {*}
     */
    getOption(key) {
        if (typeof key === 'string') {
            return this.getOptions()[key];
        }
        return null;
    }

    /**
     * Render widget
     * @return {string}
     */
    render() {
        // eslint-disable-line class-methods-use-this
        const context = (0, _extends3.default)({
            $widget: this
        }, _Registry2.default.getRepository('Config').get('locals'));

        return _jade2.default.renderFile(this.constructor.getThisPathView(), context);
    }
}
exports.default = WidgetAbstract;
module.exports = exports['default'];