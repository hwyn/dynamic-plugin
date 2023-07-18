"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorExtension = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@dynamic/builder");
var builder_context_1 = require("../../builder/builder-context");
var ValidatorExtension = /** @class */ (function (_super) {
    tslib_1.__extends(ValidatorExtension, _super);
    function ValidatorExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidatorExtension.prototype.extension = function () {
        this.validatorFields = this.mapFields(this.jsonFields.filter(function (_a) {
            var fieldDecorator = _a.fieldDecorator, validators = _a.validators;
            return fieldDecorator || validators;
        }), this.eachFile.bind(this));
    };
    ValidatorExtension.prototype.eachFile = function (_a) {
        var jsonField = _a[0];
        var changeType = jsonField.binding.changeType, _b = jsonField.updateOn, updateOn = _b === void 0 ? changeType : _b;
        var isNeedRefresh = updateOn !== changeType;
        this.pushCalculators(jsonField, {
            action: this.bindCalculatorAction(this.makeAsTouched.bind(undefined, isNeedRefresh)),
            dependents: { type: updateOn, fieldId: jsonField.id }
        });
    };
    ValidatorExtension.prototype.makeAsTouched = function (isNeedRefresh, _a) {
        var builderField = _a.builderField;
        var _b = builderField, control = _b.control, instance = _b.instance;
        if (instance.current && !control.touched) {
            control.markAsTouched();
        }
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
