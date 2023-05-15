import { Injector } from '@fm/di';
import { BuilderModel } from '@dynamic/builder';
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
