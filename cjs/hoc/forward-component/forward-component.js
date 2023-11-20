"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentBuilder = void 0;
var builder_1 = require("@dynamic/builder");
var forward_builder_1 = require("../forward-builder/forward-builder");
exports.ComponentBuilder = (0, builder_1.makeBuilderDecorator)('ComponentBuilder', forward_builder_1.setComponentDef);
