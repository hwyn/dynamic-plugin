import { ControlOptions, FormControl, FormOptions } from '@dynamic/builder';
import { Injector, InjectorToken } from '@fm/di';
export declare const CREATE_FORM_CONTROL: InjectorToken;
export declare class Control {
    private injector;
    private getType;
    createFormControl: (value: any, controlOptions: ControlOptions) => FormControl;
    constructor(injector: Injector);
    private getValidatorFn;
    private getOption;
    protected create(value: any, options: FormOptions): FormControl;
}
