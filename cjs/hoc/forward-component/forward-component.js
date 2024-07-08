"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentBuilder = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@hwy-fm/builder");
var forward_builder_1 = require("../forward-builder/forward-builder");
function forwardComponent(Model, props) {
    return (0, forward_builder_1.setComponentDef)(Model, tslib_1.__assign({ id: (0, builder_1.generateUUID)(8) }, props));
}
exports.ComponentBuilder = (0, builder_1.makeBuilderDecorator)('ComponentBuilder', forwardComponent);
