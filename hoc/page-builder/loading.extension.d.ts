import { BasicExtension } from '@hwy-fm/builder';
export declare const OPEN_LOADING = "openLoading";
export declare const CLOSE_LOADING = "closeLoading";
export declare class LoadingExtension extends BasicExtension {
    protected extension(): void;
    protected destroy(): void | import("rxjs").Observable<any>;
}
