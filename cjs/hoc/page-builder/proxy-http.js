"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyHttp = exports.PAGE_TOKEN = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@hwy-fm/di");
var operators_1 = require("rxjs/operators");
var token_1 = require("../../token");
exports.PAGE_TOKEN = di_1.InjectorToken.get('PAGE_TOKEN');
var ProxyHttp = /** @class */ (function () {
    function ProxyHttp(http, jc, page) {
        this.http = http;
        this.jc = jc;
        this.page = page;
    }
    ProxyHttp.prototype.proxyLoading = function (obs) {
        var _this = this;
        var st = setTimeout(function () { return (_this.page._openLoading(), st = null); });
        return obs.pipe((0, operators_1.finalize)(function () { return st ? clearTimeout(st) : _this.page._closeLoading(); }));
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
    ProxyHttp = tslib_1.__decorate([
        tslib_1.__param(0, (0, di_1.Inject)(token_1.PLUGIN_HTTP_CLIENT)),
        tslib_1.__param(1, (0, di_1.Inject)(token_1.PLUGIN_GET_CONFIG)),
        tslib_1.__param(2, (0, di_1.Inject)(exports.PAGE_TOKEN)),
        tslib_1.__metadata("design:paramtypes", [Object, Function, Object])
    ], ProxyHttp);
    return ProxyHttp;
}());
exports.ProxyHttp = ProxyHttp;
