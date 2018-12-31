'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * Event Emitter class
 * @implements EventEmitterInterface
 */
class EventEmitter {
    constructor() {
        this._subscribers = [];
    }
    /**
     * Collection of subscribers
     * @type {Array<SubscriberType>}
     * @private
     */


    /**
     * Subscribe
     * @param  {string} event - Event key
     * @param  {HandlerType} handler - Handler of event
     * @param  {number} priority - Priority
     * @param  {any} context? - Handler context
     * @returns void
     */
    subscribe(event, handler, priority = 10, context) {
        const subscriber = {
            event,
            handler: handler.bind(context || handler),
            priority
        };
        this.addSubscriber(subscriber);
    }

    /**
     * Emit event
     * @param  {string} event
     * @param  {any} args?
     * @returns void
     */
    emit(event, args) {
        this.getSubscribersByEvent(event).map(handler => handler.handler(args));
    }

    /**
     * Get all subscribers by event from collection
     * @param  {string} event
     * @returns {Array<SubscriberType>}
     */
    getSubscribersByEvent(event) {
        return this.getAllSubscribers().filter(subscriber => subscriber.event === event);
    }

    /**
     * Add handler to collection
     * @param  {SubscriberType} subscriber
     * @returns void
     */
    addSubscriber(subscriber) {
        this._subscribers.push(subscriber);
    }

    /**
     * Get all subscribers from collection
     * @returns {Array<SubscriberType>}
     */
    getAllSubscribers() {
        return this._subscribers.sort((a, b) => Number(a.priority > b.priority));
    }
}

exports.default = new EventEmitter();
module.exports = exports['default'];