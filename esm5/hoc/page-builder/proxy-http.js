import { __decorate, __metadata, __param } from "tslib";
import { Inject, InjectorToken } from '@fm/di';
import { finalize } from 'rxjs';
import { PLUGIN_GET_CONFIG, PLUGIN_HTTP_CLIENT } from '../../token';
export var PAGE_TOKEN = InjectorToken.get('PAGE_TOKEN');
var ProxyHttp = /** @class */ (function () {
    function ProxyHttp(http, jc, page) {
        this.http = http;
        this.jc = jc;
        this.page = page;
    }
    ProxyHttp.prototype.proxyLoading = function (obs) {
        var _this = this;
        var st = setTimeout(function () { return (_this.page._openLoading(), st = null); });
        return obs.pipe(finalize(function () { return st ? clearTimeout(st) : _this.page._closeLoading(); }));
    };
    ProxyHttp.prototype.get = function (req, params) {
        return this.proxyLoading(this.http.get(req, params));
    };
    ProxyHttp.prototype.getText = function (req, params) {
        return this.proxyLoading(this.http.getText(req, params));
    };
    ProxyHttp.prototype.getJsonConfig = function (url) {
        return this.proxyLoading(this.jc(url));
    };
    ProxyHttp.prototype.post = function (req, params) {
        return this.proxyLoading(this.http.post(req, params));
    };
    ProxyHttp.prototype.put = function (req, params) {
        return this.proxyLoading(this.http.put(req, params));
    };
    ProxyHttp.prototype.delete = function (req, params) {
        return this.proxyLoading(this.http.delete(req, params));
    };
    ProxyHttp.prototype.request = function (method, req, params) {
        return this.proxyLoading(this.http.request(method, req, params));
    };
    ProxyHttp = __decorate([
        __param(0, Inject(PLUGIN_HTTP_CLIENT)),
        __param(1, Inject(PLUGIN_GET_CONFIG)),
        __param(2, Inject(PAGE_TOKEN)),
        __metadata("design:paramtypes", [Object, Function, Object])
    ], ProxyHttp);
    return ProxyHttp;
}());
export { ProxyHttp };
