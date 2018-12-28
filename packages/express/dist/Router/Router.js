'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _core = require('@admin-interface/core');

var _MiddlewareEventEmitter = require('../Controller/Middleware/MiddlewareEventEmitter');

var _MiddlewareEventEmitter2 = _interopRequireDefault(_MiddlewareEventEmitter);

var _MiddlewareHandlerError = require('../Controller/Middleware/MiddlewareHandlerError');

var _MiddlewareHandlerError2 = _interopRequireDefault(_MiddlewareHandlerError);

var _MiddlewareCheckHasModel = require('../Controller/Middleware/MiddlewareCheckHasModel');

var _ModelController = require('../Controller/ModelController/ModelController');

var _APIModelController = require('../Controller/ModelController/API/APIModelController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Router {
    getRouter() {
        const router = (0, _express.Router)();

        router.use(_core.Registry.getRepository('Config').get('modelPath'), this.getModelRouter());
        router.use(_core.Registry.getRepository('Config').get('apiPath'), this.getApiModelRouter());
        router.use('/', this.getPageRouter());
        router.use(_MiddlewareHandlerError2.default);

        return router;
    }

    getModelRouter() {
        // eslint-disable-line class-methods-use-this
        const modelRouter = (0, _express.Router)();

        modelRouter.use('/:model_key', ...(0, _MiddlewareEventEmitter2.default)('route:model:use'), _MiddlewareCheckHasModel.checkHasModel);
        modelRouter.get('/:model_key/list', ...(0, _MiddlewareEventEmitter2.default)('route:model:get:list'), _ModelController.getList);
        modelRouter.get('/:model_key/single/:id/view', ...(0, _MiddlewareEventEmitter2.default)('route:model:get:view'), _ModelController.getSingleModel);

        return modelRouter;
    }

    getApiModelRouter() {
        const apiRouter = (0, _express.Router)();

        apiRouter.use('/model/:model_key', ...(0, _MiddlewareEventEmitter2.default)('route:api:model:use'), _MiddlewareCheckHasModel.checkHasModel, _MiddlewareCheckHasModel.checkHasRefModel);
        apiRouter.get('/model/:model_key/list', ...(0, _MiddlewareEventEmitter2.default)('route:api:model:get:list'), _APIModelController.getApiList);
        apiRouter.post('/model/:model_key/create', ...(0, _MiddlewareEventEmitter2.default)('route:api:model:post:create'), _APIModelController.postApiCreateSingleModel);
        apiRouter.put('/model/:model_key/single/:id/update', ...(0, _MiddlewareEventEmitter2.default)('route:api:put:get:update'), _APIModelController.putUpdateSingleModel);
        apiRouter.delete('/model/:model_key/single/:id/delete', ...(0, _MiddlewareEventEmitter2.default)('route:api:model:delete:delete'), _APIModelController.deleteSingleModel);

        // field type api
        apiRouter.use(_core.Registry.getRepository('Config').get('fieldPath'), ...(0, _MiddlewareEventEmitter2.default)('route:api:fieldType:use'), this.getFieldTypeRouter());

        // widgets api
        apiRouter.use(_core.Registry.getRepository('Config').get('widgetPath'), ...(0, _MiddlewareEventEmitter2.default)('route:api:widget:use'), this.getWidgetRouter());

        return apiRouter;
    }

    getPageRouter() {
        // eslint-disable-line class-methods-use-this
        const pageRouter = (0, _express.Router)();

        Object.keys(_core.Registry.getRepository('Page').get()).forEach(key => {
            const page = _core.Registry.getRepository('Page').get(key);
            pageRouter.get(page.getUrl(), page.render.bind(page));
        });

        return pageRouter;
    }

    getFieldTypeRouter() {
        // eslint-disable-line class-methods-use-this
        const fieldTypeRouter = (0, _express.Router)();

        Object.keys(_core.Registry.getRepository('FieldType').get()).forEach(key => {
            const fieldType = _core.Registry.getRepository('FieldType').get(key);
            const routing = fieldType.getRouting();
            if (routing) {
                const routingArray = Object.values(routing);
                routingArray.forEach(route => {
                    if (route.route && route.handler) {
                        fieldTypeRouter.get(`/${key + route.route}`, route.handler);
                    }
                });
            }
        });

        return fieldTypeRouter;
    }

    getWidgetRouter() {
        // eslint-disable-line class-methods-use-this
        const widgetRouter = (0, _express.Router)();

        Object.keys(_core.Registry.getRepository('Widget').get()).forEach(key => {
            const widget = _core.Registry.getRepository('Widget').get(key);
            const routing = widget.getRouting();
            if (routing) {
                const routingArray = Object.values(routing);
                routingArray.forEach(route => {
                    if (route.route && route.handler) {
                        widgetRouter.get(`/${key + route.route}`, route.handler);
                    }
                });
            }
        });

        return widgetRouter;
    }
}
exports.default = Router;
module.exports = exports['default'];