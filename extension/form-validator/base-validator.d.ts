import { BaseType, BuilderFieldExtensions, BuilderModel, FormControl, ValidationErrors } from '@hwy-fm/builder';
export declare abstract class BaseValidator extends BaseType {
    protected builder: BuilderModel;
    protected builderField: BuilderFieldExtensions;
    protected config: any;
    abstract validator(control: FormControl): ValidationErrors | null;
}
