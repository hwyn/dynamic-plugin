"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentBuilder = exports.forwardBuilder = void 0;
var builder_1 = require("@dynamic/builder");
var builder_context_1 = require("../../builder/builder-context");
var forwardBuilder = function (Model, props) {
    return builder_context_1.builderContext.getFactory(builder_context_1.FORWARD_BUILDER)(Model, props);
};
exports.forwardBuilder = forwardBuilder;
exports.ComponentBuilder = (0, builder_1.makeBuilderDecorator)('ComponentBuilder', exports.forwardBuilder);
