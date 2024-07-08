import { ControlOptions, FormControl, FormOptions } from '@hwy-fm/builder';
import { Injector, InjectorToken } from '@hwy-fm/di';
export declare const CREATE_FORM_CONTROL: InjectorToken;
export declare class ControlIntercept {
    private injector;
    private getType;
    createFormControl: (value: any, controlOptions: ControlOptions, options: FormOptions) => FormControl;
    constructor(injector: Injector);
    private getValidatorFn;
    private getOption;
    updateValidators(validators: any[], options: FormOptions): void;
    protected create(value: any, options: FormOptions): FormControl;
}
