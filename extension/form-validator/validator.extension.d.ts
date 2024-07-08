import { BaseAction, BasicExtension, CallBackOptions } from '@hwy-fm/builder';
import { Observable } from 'rxjs';
export declare class ValidatorExtension extends BasicExtension {
    private validatorFields;
    private controlIntercept;
    protected beforeExtension(): void;
    protected extension(): void | Observable<any>;
    protected addFieldCalculators([jsonField, builderField]: CallBackOptions): void;
    protected addTouchedCalculator(jsonField: any): {
        action: import("../../../dynamic-builder").Action;
        dependents: {
            type: any;
            fieldId: any;
        }[];
    };
    protected serializeValidatorConfig(jsonField: any): any;
    protected updateValidators({ actionEvent, builderField }: BaseAction): void;
    protected makeAsTouched({ builderField }: BaseAction): void;
    protected beforeDestroy(): void | Observable<any>;
}
