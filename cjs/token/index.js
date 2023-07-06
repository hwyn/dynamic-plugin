"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_HISTORY = exports.PLUGIN_HTTP_CLIENT = exports.PLUGIN_GET_CONFIG = void 0;
var di_1 = require("@fm/di");
exports.PLUGIN_GET_CONFIG = di_1.InjectorToken.get('PLUGIN_GET_CONFIG');
exports.PLUGIN_HTTP_CLIENT = di_1.InjectorToken.get('HTTP_CLIENT');
exports.PLUGIN_HISTORY = di_1.InjectorToken.get('PROXY_HISTORY');
