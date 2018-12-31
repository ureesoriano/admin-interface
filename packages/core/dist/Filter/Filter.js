'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * Filter class
 */
class Filter {
    constructor() {
        this._filters = [];
    }
    /**
     * Filters
     * @type {Array}
     * @private
     */


    /**
     * Add filter
     * @param {string} filterName
     * @param {FilterHandlerType} handler
     * @param {number} priority
     * @param {any} context
     */
    addFilter(filterName, handler, priority = 10, context) {
        const filter = {
            filterName,
            handler: handler.bind(context || handler),
            priority
        };

        this.setFilter(filter);
    }

    /**
     * Apply filter
     * @param {string} filterName - Filter name
     * @param {any} data - Data for filtration
     * @returns {any}
     */
    applyFilter(filterName, data) {
        let _data = data;
        this.getFiltersByName(filterName).forEach(filter => {
            _data = filter.handler(_data);
        });
        return _data;
    }

    /**
     * Set filter
     * @private
     * @param {FilterType} filter
     * @returns {Filter}
     */
    setFilter(filter) {
        this._filters.push(filter);
        return this;
    }

    /**
     * Get all filters
     * @private
     * @returns {Array<FilterType>}
     */
    getAllFilter() {
        return this._filters;
    }

    /**
     * Get filters by name
     * @private
     * @param filterName
     * @returns {Array<FilterType>}
     */
    getFiltersByName(filterName) {
        return this.getAllFilter().sort((a, b) => Number(a.priority > b.priority)).filter(filter => filter.filterName === filterName);
    }
}

exports.default = Filter;
module.exports = exports['default'];