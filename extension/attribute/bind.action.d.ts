import { BaseAction } from '@dynamic/builder';
import { MethodProxy } from '@fm/di';
export declare class Bind<T = any> extends BaseAction {
    meta: T;
    mp: MethodProxy;
    protected parseTemplate(code: string): string;
    protected executeMethod(method: string): string;
    protected execute(bindAttr: string): any;
}
