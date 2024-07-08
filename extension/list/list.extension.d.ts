import { BasicExtension, BuilderFieldExtensions, CallBackOptions } from '@hwy-fm/builder';
export declare class ListExtension extends BasicExtension {
    private jsonGrid;
    private proxyFields;
    protected initProxyFields(): BuilderFieldExtensions[];
    protected extension(): void;
    protected cloneField([_jsonField, builderField]: CallBackOptions): any;
    private proxyField;
    private resetElement;
}
