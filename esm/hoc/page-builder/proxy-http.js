import { __decorate, __metadata, __param } from "tslib";
import { HttpClient, JsonConfigService } from '@fm/csr';
import { Inject, InjectorToken } from '@fm/di';
import { finalize } from 'rxjs';
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
        return this.proxyLoading(this.jc.getJsonConfig(url));
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
    __param(0, Inject(HttpClient)),
    __param(1, Inject(JsonConfigService)),
    __param(2, Inject(PAGE_TOKEN)),
    __metadata("design:paramtypes", [HttpClient,
        JsonConfigService, Object])
], ProxyHttp);
export { ProxyHttp };
