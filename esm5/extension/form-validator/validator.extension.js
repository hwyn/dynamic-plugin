import { __decorate, __extends } from "tslib";
import { BasicExtension, CHANGE } from '@dynamic/builder';
import { isEmpty } from 'lodash';
import { Extension } from '../../builder/builder-context';
var ValidatorExtension = /** @class */ (function (_super) {
    __extends(ValidatorExtension, _super);
    function ValidatorExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidatorExtension.prototype.beforeExtension = function () {
        this.jsonFields.forEach(function (jsonField) {
            if (jsonField.validators) {
                jsonField.binding = jsonField.binding || { changeType: CHANGE };
            }
        });
    };
    ValidatorExtension.prototype.extension = function () {
        var fields = this.jsonFields.filter(function (_a) {
            var validators = _a.validators;
            return !isEmpty(validators);
        });
        this.validatorFields = this.mapFields(fields, this.eachFile.bind(this));
    };
    ValidatorExtension.prototype.eachFile = function (_a) {
        var jsonField = _a[0], builderField = _a[1];
        var id = jsonField.id, changeType = jsonField.binding.changeType, _b = jsonField.updateOn, updateOn = _b === void 0 ? changeType : _b;
        var isNeedRefresh = updateOn !== changeType;
        this.pushCalculators(jsonField, {
            action: this.bindCalculatorAction(this.makeAsTouched.bind(undefined, isNeedRefresh)),
            dependents: this.toArray(updateOn).map(function (type) { return ({ type: type, fieldId: id }); })
        });
        delete builderField.field.updateOn;
    };
    ValidatorExtension.prototype.makeAsTouched = function (isNeedRefresh, _a) {
        var builderField = _a.builderField;
        var _b = builderField, control = _b.control, instance = _b.instance;
        control.updateValueAndValidity();
        instance.current && !control.touched && control.markAsTouched();
        isNeedRefresh && control.touched && instance.detectChanges();
    };
    ValidatorExtension.prototype.beforeDestroy = function () {
        this.validatorFields.forEach(function (_a) {
            var control = _a.control;
            return control.clearValidators();
        });
        return _super.prototype.beforeDestroy.call(this);
    };
    ValidatorExtension = __decorate([
        Extension()
    ], ValidatorExtension);
    return ValidatorExtension;
}(BasicExtension));
export { ValidatorExtension };
