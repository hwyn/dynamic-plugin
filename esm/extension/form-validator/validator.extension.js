import { __decorate } from "tslib";
import { BasicExtension, CALCULATOR, CHANGE, CREATE_CONTROL } from '@dynamic/builder';
import { isEmpty } from 'lodash';
import { CONTROL_INTERCEPT, Extension } from '../../builder/builder-context';
let ValidatorExtension = class ValidatorExtension extends BasicExtension {
    constructor() {
        super(...arguments);
        this.controlIntercept = this.injector.get(CONTROL_INTERCEPT);
    }
    beforeExtension() {
        this.jsonFields.forEach((jsonField) => {
            if (jsonField.validators) {
                jsonField.binding = jsonField.binding || { changeType: CHANGE };
            }
        });
    }
    extension() {
        const fields = this.jsonFields.filter(({ validators }) => !isEmpty(validators));
        this.validatorFields = this.mapFields(fields, this.addFieldCalculators.bind(this));
    }
    addFieldCalculators([jsonField, builderField]) {
        this.pushCalculators(jsonField, [
            this.serializeValidatorConfig(jsonField),
            this.addTouchedCalculator(jsonField)
        ]);
        delete builderField.field.validators;
        delete builderField.field.updateOn;
    }
    addTouchedCalculator(jsonField) {
        const { id, binding: { changeType }, updateOn = changeType } = jsonField;
        return {
            action: this.bindCalculatorAction(this.makeAsTouched.bind(undefined)),
            dependents: this.toArray(updateOn).map((type) => ({ type, fieldId: id }))
        };
    }
    serializeValidatorConfig(jsonField) {
        const { validators: jsonValidators = [] } = jsonField;
        const action = !Array.isArray(jsonValidators) ? jsonValidators : () => jsonValidators;
        const defaultDependents = { type: CREATE_CONTROL, fieldId: jsonField.id };
        const validators = this.serializeCalculatorConfig(action, CALCULATOR, defaultDependents);
        validators.action.after = this.bindCalculatorAction(this.updateValidators.bind(this));
        return validators;
    }
    updateValidators({ actionEvent = [], builderField }) {
        this.controlIntercept.updateValidators(actionEvent, { builderField, builder: this.builder });
    }
    makeAsTouched({ builderField }) {
        const { control, instance } = builderField;
        control.updateValueAndValidity();
        instance.current && !control.touched && control.markAsTouched();
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
