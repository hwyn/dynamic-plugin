"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBuilder = void 0;
var tslib_1 = require("tslib");
var csr_1 = require("@fm/csr");
var di_1 = require("@fm/di");
var builder_1 = require("@dynamic/builder");
var proxy_http_1 = require("./proxy-http");
var PageBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(PageBuilder, _super);
    function PageBuilder(injector) {
        var _this = _super.call(this) || this;
        var proxyGetJson = function (proxy) { return proxy.getJsonConfig.bind(proxy); };
        var additionalProviders = [
            proxy_http_1.ProxyHttp,
            { provide: proxy_http_1.PAGE_TOKEN, useFactory: function () { return _this; } },
            { provide: builder_1.GET_JSON_CONFIG, useFactory: proxyGetJson, deps: [proxy_http_1.ProxyHttp] },
        ];
        _this.injector = di_1.Injector.create(additionalProviders, injector);
        _this.routerHandler();
        return _this;
    }
    PageBuilder.prototype.routerHandler = function () {
        var _this = this;
        var history = this.injector.get(csr_1.CustomHistory);
        if (history) {
            this.pushRoute = history.pushRoute.subscribe(function (result) { return _this._openLoading(result); });
            this.activeRoute = history.activeRoute.subscribe(function (result) { return _this._closeLoading(result); });
            this.cancelRoute = history.cancelRoute.subscribe(function (result) { return _this._closeLoading(result); });
        }
    };
    PageBuilder.prototype._openLoading = function (res) {
        this.openLoading && this.openLoading(res);
    };
    PageBuilder.prototype._closeLoading = function (res) {
        this.closeLoading && this.closeLoading(res);
    };
    PageBuilder.prototype.destroy = function () {
        this.pushRoute && this.pushRoute.unsubscribe();
        this.activeRoute && this.activeRoute.unsubscribe();
        this.cancelRoute && this.cancelRoute.unsubscribe();
        this.injector.destroy();
    };
    return PageBuilder;
}(builder_1.BuilderModel));
exports.PageBuilder = PageBuilder;
