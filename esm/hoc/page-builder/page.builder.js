import { BuilderModel, GET_JSON_CONFIG } from '@dynamic/builder';
import { Injector } from '@fm/di';
import { PLUGIN_HISTORY } from '../../token';
import { PAGE_TOKEN, ProxyHttp } from './proxy-http';
export class PageBuilder extends BuilderModel {
    constructor(injector) {
        super();
        const proxyGetJson = (proxy) => proxy.getJsonConfig.bind(proxy);
        const additionalProviders = [
            ProxyHttp,
            { provide: PAGE_TOKEN, useFactory: () => this },
            { provide: GET_JSON_CONFIG, useFactory: proxyGetJson, deps: [ProxyHttp] },
        ];
        this.injector = Injector.create(additionalProviders, injector);
        this.routerHandler();
    }
    routerHandler() {
        const history = this.injector.get(PLUGIN_HISTORY);
        if (history) {
            this.pushRoute = history.pushRoute.subscribe((result) => this._openLoading(result));
            this.activeRoute = history.activeRoute.subscribe((result) => this._closeLoading(result));
            this.cancelRoute = history.cancelRoute.subscribe((result) => this._closeLoading(result));
        }
    }
    _openLoading(res) {
        this.openLoading && this.openLoading(res);
    }
    _closeLoading(res) {
        this.closeLoading && this.closeLoading(res);
    }
    destroy() {
        this.pushRoute && this.pushRoute.unsubscribe();
        this.activeRoute && this.activeRoute.unsubscribe();
        this.cancelRoute && this.cancelRoute.unsubscribe();
        this.injector.destroy();
    }
}
