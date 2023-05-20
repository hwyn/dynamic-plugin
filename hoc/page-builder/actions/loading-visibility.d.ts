import { BaseAction, Visibility } from '@dynamic/builder';
export declare class LoadingVisibility extends BaseAction {
    private count;
    private st;
    protected execute([{ type: callType }]: any[]): Visibility.none | Visibility.visible;
    private asyncExec;
}
