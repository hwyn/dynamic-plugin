"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBuilder = exports.forwardPage = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@dynamic/builder");
var di_1 = require("@fm/di");
var forward_builder_1 = require("../forward-builder/forward-builder");
var load_config_1 = require("./actions/load-config");
var loading_extension_1 = require("./loading.extension");
var page_builder_1 = require("./page.builder");
function forwardPage(Model, _a) {
    var pageClassName = _a.pageClassName, props = tslib_1.__rest(_a, ["pageClassName"]);
    var factory = function (injector) { return new page_builder_1.PageBuilder(injector); };
    var provider = { provide: factory, providedIn: 'any', useFactory: factory, deps: [di_1.Injector] };
    var Component = (0, forward_builder_1.forwardBuilder)((0, di_1.setInjectableDef)(factory, provider), {
        extension: [loading_extension_1.LoadingExtension],
        className: ['page-container', pageClassName].join(' '),
        configAction: { name: load_config_1.LoadConfig.actionName, params: { props: props, Model: Model } }
    });
    return Object.defineProperty(Model, 'componentDef', { value: Component, writable: false });
}
exports.forwardPage = forwardPage;
exports.PageBuilder = (0, builder_1.makeBuilderDecorator)('PageBuilder', forwardPage);
