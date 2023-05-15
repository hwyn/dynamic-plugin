import { __assign, __decorate, __metadata } from "tslib";
import { GET_TYPE } from '@dynamic/builder';
import { Inject, Injector, InjectorToken } from '@fm/di';
import { ControlIntercept, VALIDATOR } from '../../builder/builder-context';
import { BaseValidator } from './base-validator';
export var CREATE_FORM_CONTROL = InjectorToken.get('CREATE_FORM_CONTROL');
var Control = /** @class */ (function () {
    function Control(injector) {
        this.injector = injector;
    }
    Control.prototype.getValidatorFn = function (config, options) {
        var validatorFn;
        var context = __assign(__assign({}, options), { config: config });
        var builderHandler = options.builder.getExecuteHandler(config.name, false);
        if (builderHandler) {
            validatorFn = builderHandler(new BaseValidator().invoke(__assign({ injector: this.injector }, context)));
        }
        if (!validatorFn) {
            var validatorType = config instanceof BaseValidator ? config : this.getType(VALIDATOR, config.name);
            var validator_1 = validatorType && this.injector.get(validatorType).invoke(context);
            if (!validator_1) {
                console.info("validator: ".concat(config.name, "\u6CA1\u6709\u6CE8\u518C"));
            }
            validatorFn = function (control) { return (validator_1 === null || validator_1 === void 0 ? void 0 : validator_1.validator(control)) || null; };
        }
        return validatorFn;
    };
    Control.prototype.getOption = function (configs, options, isAsync) {
        var _this = this;
        var filterConfig = configs.filter(function (_a) {
            var async = _a.async;
            return isAsync ? async : !async;
        });
        return filterConfig.map(function (config) { return _this.getValidatorFn(config, options); });
    };
    Control.prototype.create = function (value, options) {
        var _a = options.builderField, field = _a.field, _b = _a.field.validators, validators = _b === void 0 ? [] : _b;
        var controlOptions = {
            validators: this.getOption(validators, options),
            asyncValidators: this.getOption(validators, options, true)
        };
        delete field.validators;
        return this.createFormControl(value, controlOptions);
    };
    __decorate([
        Inject(GET_TYPE),
        __metadata("design:type", Object)
    ], Control.prototype, "getType", void 0);
    __decorate([
        Inject(CREATE_FORM_CONTROL),
        __metadata("design:type", Function)
    ], Control.prototype, "createFormControl", void 0);
    Control = __decorate([
        ControlIntercept(),
        __metadata("design:paramtypes", [Injector])
    ], Control);
    return Control;
}());
export { Control };
