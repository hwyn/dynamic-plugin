"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentDef = exports.setComponentDef = exports.forwardBuilder = void 0;
var builder_context_1 = require("../../builder/builder-context");
var forwardBuilder = function (Model, props) {
    return builder_context_1.builderContext.getFactory(builder_context_1.FORWARD_BUILDER)(Model, props);
};
exports.forwardBuilder = forwardBuilder;
var setComponentDef = function (Model, props) {
    return Object.defineProperty(Model, 'componentDef', { value: (0, exports.forwardBuilder)(Model, props) });
};
exports.setComponentDef = setComponentDef;
var getComponentDef = function (Model) {
    return Model.componentDef;
};
exports.getComponentDef = getComponentDef;
