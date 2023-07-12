import { __decorate, __metadata, __param } from "tslib";
import { Inject, InjectorToken } from '@fm/di';
import { finalize } from 'rxjs/operators';
import { PLUGIN_GET_CONFIG, PLUGIN_HTTP_CLIENT } from '../../token';
export const PAGE_TOKEN = InjectorToken.get('PAGE_TOKEN');
let ProxyHttp = class ProxyHttp {
    constructor(http, jc, page) {
        this.http = http;
        this.jc = jc;
        this.page = page;
    }
    proxyLoading(obs) {
        let st = setTimeout(() => (this.page._openLoading(), st = null));
        return obs.pipe(finalize(() => st ? clearTimeout(st) : this.page._closeLoading()));
    }
    get(req, params) {
        return this.proxyLoading(this.http.get(req, params));
    }
    getText(req, params) {
        return this.proxyLoading(this.http.getText(req, params));
    }
    getJsonConfig(url) {
        return this.proxyLoading(this.jc(url));
    }
    post(req, params) {
        return this.proxyLoading(this.http.post(req, params));
    }
    put(req, params) {
        return this.proxyLoading(this.http.put(req, params));
    }
    delete(req, params) {
        return this.proxyLoading(this.http.delete(req, params));
    }
    request(method, req, params) {
        return this.proxyLoading(this.http.request(method, req, params));
    }
};
ProxyHttp = __decorate([
    __param(0, Inject(PLUGIN_HTTP_CLIENT)),
    __param(1, Inject(PLUGIN_GET_CONFIG)),
    __param(2, Inject(PAGE_TOKEN)),
    __metadata("design:paramtypes", [Object, Function, Object])
], ProxyHttp);
export { ProxyHttp };
