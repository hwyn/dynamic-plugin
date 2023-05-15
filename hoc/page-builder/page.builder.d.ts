import { BuilderModel } from '@dynamic/builder';
import { Injector } from '@fm/di';
export declare class PageBuilder extends BuilderModel {
    openLoading: any;
    closeLoading: any;
    private pushRoute;
    private activeRoute;
    private cancelRoute;
    constructor(injector: Injector);
    private routerHandler;
    private _openLoading;
    private _closeLoading;
    protected destroy(): void;
}
