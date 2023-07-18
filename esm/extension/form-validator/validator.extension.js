import { __decorate } from "tslib";
import { BasicExtension } from '@dynamic/builder';
import { Extension } from '../../builder/builder-context';
let ValidatorExtension = class ValidatorExtension extends BasicExtension {
    extension() {
        this.validatorFields = this.mapFields(this.jsonFields.filter(({ fieldDecorator, validators }) => fieldDecorator || validators), this.eachFile.bind(this));
    }
    eachFile([jsonField]) {
        const { binding: { changeType }, updateOn = changeType } = jsonField;
        const isNeedRefresh = updateOn !== changeType;
        this.pushCalculators(jsonField, {
            action: this.bindCalculatorAction(this.makeAsTouched.bind(undefined, isNeedRefresh)),
            dependents: { type: updateOn, fieldId: jsonField.id }
        });
    }
    makeAsTouched(isNeedRefresh, { builderField }) {
        const { control, instance } = builderField;
        if (instance.current && !control.touched) {
            control.markAsTouched();
        }
        isNeedRefresh && control.touched && instance.detectChanges();
    }
    beforeDestroy() {
        this.validatorFields.forEach(({ control }) => control.clearValidators());
        return super.beforeDestroy();
    }
};
ValidatorExtension = __decorate([
    Extension()
], ValidatorExtension);
export { ValidatorExtension };
