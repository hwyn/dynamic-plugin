import { BasicExtension, CallBackOptions } from '@dynamic/builder';
export declare class ListExtension extends BasicExtension {
    private jsonGrid;
    private proxyFields;
    protected beforeExtension(): void;
    protected extension(): void;
    protected cloneField([_jsonField, builderField]: CallBackOptions): any;
    private proxyField;
    private resetElement;
}
