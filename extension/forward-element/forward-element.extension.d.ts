import { BasicExtension, BuilderEngine, BuilderFieldExtensions } from '@dynamic/builder';
import { Observable } from 'rxjs';
export declare class ForwardElementExtension extends BasicExtension {
    protected engine: BuilderEngine;
    protected extension(): void | Observable<any>;
    protected afterExtension(): void;
    private proxyElement;
    protected transform(builderField: BuilderFieldExtensions, element: any): any;
    protected destroy(): void | Observable<any>;
}
