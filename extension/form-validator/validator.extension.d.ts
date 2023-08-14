import { BaseAction, BasicExtension, CallBackOptions } from '@dynamic/builder';
import { Observable } from 'rxjs';
export declare class ValidatorExtension extends BasicExtension {
    private validatorFields;
    protected beforeExtension(): void;
    protected extension(): void | Observable<any>;
    protected eachFile([jsonField, builderField]: CallBackOptions): void;
    protected makeAsTouched(isNeedRefresh: boolean, { builderField }: BaseAction): void;
    protected beforeDestroy(): void | Observable<any>;
}
