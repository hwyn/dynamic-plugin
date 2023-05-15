import { __extends } from "tslib";
import { BuilderModel, GET_JSON_CONFIG } from '@dynamic/builder';
import { CustomHistory } from '@fm/csr';
import { Injector } from '@fm/di';
import { PAGE_TOKEN, ProxyHttp } from './proxy-http';
var PageBuilder = /** @class */ (function (_super) {
    __extends(PageBuilder, _super);
    function PageBuilder(injector) {
        var _this = _super.call(this) || this;
        var proxyGetJson = function (proxy) { return proxy.getJsonConfig.bind(proxy); };
        var additionalProviders = [
            ProxyHttp,
            { provide: PAGE_TOKEN, useFactory: function () { return _this; } },
            { provide: GET_JSON_CONFIG, useFactory: proxyGetJson, deps: [ProxyHttp] },
        ];
        _this.injector = Injector.create(additionalProviders, injector);
        _this.routerHandler();
        return _this;
    }
    PageBuilder.prototype.routerHandler = function () {
        var _this = this;
        var history = this.injector.get(CustomHistory);
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
}(BuilderModel));
export { PageBuilder };
