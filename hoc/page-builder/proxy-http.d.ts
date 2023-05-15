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
    get(req: RequestInfo | string, params?: RequestInit): Observable<any>;
    getText(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    getJsonConfig(url: string): Observable<object>;
    post(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    put(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    delete(req: RequestInfo | string, params?: RequestInit): Observable<string>;
    request(method: string, req: RequestInfo | string, params?: RequestInit): Observable<Response>;
}
