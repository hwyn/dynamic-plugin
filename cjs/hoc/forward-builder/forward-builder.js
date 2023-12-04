"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentDef = exports.setComponentDef = exports.forwardBuilder = void 0;
var builder_context_1 = require("../../builder/builder-context");
var builder_def_1 = require("./builder-def");
var forwardBuilder = function (Model, props) {
    var _a;
    return ((_a = builder_context_1.builderContext.getFactory(builder_context_1.FORWARD_BUILDER)) !== null && _a !== void 0 ? _a : builder_def_1.BuilderDef.create)(Model, props);
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
