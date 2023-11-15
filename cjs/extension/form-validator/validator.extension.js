"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorExtension = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@dynamic/builder");
var lodash_1 = require("lodash");
var builder_context_1 = require("../../builder/builder-context");
var ValidatorExtension = /** @class */ (function (_super) {
    tslib_1.__extends(ValidatorExtension, _super);
    function ValidatorExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controlIntercept = _this.injector.get(builder_context_1.CONTROL_INTERCEPT);
        return _this;
    }
    ValidatorExtension.prototype.beforeExtension = function () {
        this.jsonFields.forEach(function (jsonField) {
            if (jsonField.validators) {
                jsonField.binding = jsonField.binding || { changeType: builder_1.CHANGE };
            }
        });
    };
    ValidatorExtension.prototype.extension = function () {
        var fields = this.jsonFields.filter(function (_a) {
            var validators = _a.validators;
            return !(0, lodash_1.isEmpty)(validators);
        });
        this.validatorFields = this.mapFields(fields, this.addFieldCalculators.bind(this));
    };
    ValidatorExtension.prototype.addFieldCalculators = function (_a) {
        var jsonField = _a[0], builderField = _a[1];
        this.pushCalculators(jsonField, [
            this.serializeValidatorConfig(jsonField),
            this.addTouchedCalculator(jsonField)
        ]);
        delete builderField.field.validators;
        delete builderField.field.updateOn;
    };
    ValidatorExtension.prototype.addTouchedCalculator = function (jsonField) {
        var id = jsonField.id, changeType = jsonField.binding.changeType, _a = jsonField.updateOn, updateOn = _a === void 0 ? changeType : _a;
        var isNeedRefresh = updateOn !== changeType;
        return {
            action: this.bindCalculatorAction(this.makeAsTouched.bind(undefined, isNeedRefresh)),
            dependents: this.toArray(updateOn).map(function (type) { return ({ type: type, fieldId: id }); })
        };
    };
    ValidatorExtension.prototype.serializeValidatorConfig = function (jsonField) {
        var _a = jsonField.validators, jsonValidators = _a === void 0 ? [] : _a;
        var action = !Array.isArray(jsonValidators) ? jsonValidators : function () { return jsonValidators; };
        var defaultDependents = { type: builder_1.CREATE_CONTROL, fieldId: jsonField.id };
        var validators = this.serializeCalculatorConfig(action, builder_1.CALCULATOR, defaultDependents);
        validators.action.after = this.bindCalculatorAction(this.updateValidators.bind(this));
        return validators;
    };
    ValidatorExtension.prototype.updateValidators = function (_a) {
        var _b = _a.actionEvent, actionEvent = _b === void 0 ? [] : _b, builderField = _a.builderField;
        this.controlIntercept.updateValidators(actionEvent, { builderField: builderField, builder: this.builder });
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
    ValidatorExtension = tslib_1.__decorate([
        (0, builder_context_1.Extension)()
    ], ValidatorExtension);
    return ValidatorExtension;
}(builder_1.BasicExtension));
exports.ValidatorExtension = ValidatorExtension;
