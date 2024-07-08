import { InjectorToken } from '@hwy-fm/di';
import { Observable } from 'rxjs';
export declare const PAGE_TOKEN: InjectorToken;
export declare class ProxyHttp {
    private http;
    private jc;
    private page;
    constructor(http: any, jc: (url: string) => Observable<any>, page: any);
    proxyLoading<T>(obs: Observable<T>): Observable<T>;
    get(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    getText(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    getJsonConfig(url: string): Observable<any>;
    post(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    put(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    delete(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    request(method: string, req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
}
