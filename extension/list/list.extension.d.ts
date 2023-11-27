import { BasicExtension, BuilderFieldExtensions, CallBackOptions } from '@dynamic/builder';
export declare class ListExtension extends BasicExtension {
    private jsonGrid;
    private proxyFields;
    protected initProxyFields(): BuilderFieldExtensions[];
    protected extension(): void;
    protected cloneField([_jsonField, builderField]: CallBackOptions): any;
    private proxyField;
    private resetElement;
}
