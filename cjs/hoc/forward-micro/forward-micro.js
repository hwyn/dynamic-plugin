"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardMicro = void 0;
var builder_context_1 = require("../../builder/builder-context");
var forwardMicro = function (microName) { return builder_context_1.builderContext.getFactory(builder_context_1.FORWARD_MICRO)(microName); };
exports.forwardMicro = forwardMicro;
