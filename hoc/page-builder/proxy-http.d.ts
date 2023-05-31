import { HttpClient, JsonConfigService } from '@fm/csr';
import { InjectorToken } from '@fm/di';
import { Observable } from 'rxjs';
export declare const PAGE_TOKEN: InjectorToken;
export declare class ProxyHttp {
    private http;
    private jc;
    private page;
    constructor(http: HttpClient, jc: JsonConfigService, page: any);
    private proxyLoading;
    get(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    getText(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    getJsonConfig(url: string): Observable<object>;
    post(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    put(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    delete(req: RequestInfo | string, params?: RequestInit): Observable<unknown>;
    request(method: string, req: RequestInfo | string, params?: RequestInit): Observable<Response>;
}
