import { __decorate } from "tslib";
import { BasicExtension, CHANGE } from '@dynamic/builder';
import { isEmpty } from 'lodash';
import { Extension } from '../../builder/builder-context';
let ValidatorExtension = class ValidatorExtension extends BasicExtension {
    beforeExtension() {
        this.jsonFields.forEach((jsonField) => {
            if (jsonField.validators) {
                jsonField.binding = jsonField.binding || { changeType: CHANGE };
            }
        });
    }
    extension() {
        const fields = this.jsonFields.filter(({ validators }) => !isEmpty(validators));
        this.validatorFields = this.mapFields(fields, this.eachFile.bind(this));
    }
    eachFile([jsonField, builderField]) {
        const { id, binding: { changeType }, updateOn = changeType } = jsonField;
        const isNeedRefresh = updateOn !== changeType;
        this.pushCalculators(jsonField, {
            action: this.bindCalculatorAction(this.makeAsTouched.bind(undefined, isNeedRefresh)),
            dependents: this.toArray(updateOn).map((type) => ({ type: type, fieldId: id }))
        });
        delete builderField.field.updateOn;
    }
    makeAsTouched(isNeedRefresh, { builderField }) {
        const { control, instance } = builderField;
        control.updateValueAndValidity();
        instance.current && !control.touched && control.markAsTouched();
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
