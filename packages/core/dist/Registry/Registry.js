'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Repository = require('./Repository');

var _Repository2 = _interopRequireDefault(_Repository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Registry
 */
class Registry {
    constructor() {
        this._repositories = {};
    }

    /**
     * Get repository
     * @param {string} key
     * @returns {Repository}
     */
    getRepository(key) {
        if (this.hasRepository(key)) {
            return this.findRepository(key);
        }
        return this.setRepository(key);
    }

    /**
     * Check has is a repository in the registry
     * @param {string} key
     * @return {boolean}
     */
    hasRepository(key) {
        return _lodash2.default.has(this.getRepositories(), key);
    }

    /**
     * Get all repositories
     * @return {{string: Repository}}
     */
    getRepositories() {
        return this._repositories;
    }

    /**
     * Find repository by key
     * @param {string} key
     * @returns {Repository|null}
     */
    findRepository(key) {
        return _lodash2.default.get(this.getRepositories(), key);
    }

    /**
     * Set a new empty repository
     * @param {string} key
     * @return {Repository}
     */
    setRepository(key) {
        this.getRepositories()[key] = new _Repository2.default();
        return this.findRepository(key);
    }
}

exports.default = new Registry();
module.exports = exports['default'];