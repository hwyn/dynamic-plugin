import { __assign, __decorate, __metadata } from "tslib";
import { GET_TYPE, serializeAction } from '@hwy-fm/builder';
import { Inject, Injector, InjectorToken } from '@hwy-fm/di';
import { isObservable, of } from 'rxjs';
import { ControlIntercept as Intercept, VALIDATOR } from '../../builder/builder-context';
import { BaseValidator } from './base-validator';
export var CREATE_FORM_CONTROL = InjectorToken.get('CREATE_FORM_CONTROL');
var ControlIntercept = /** @class */ (function () {
    function ControlIntercept(injector) {
        this.injector = injector;
    }
    ControlIntercept.prototype.getValidatorFn = function (config, options) {
        var validatorFn;
        var context = __assign(__assign({ injector: this.injector }, options), { config: config });
        var _a = serializeAction(config), name = _a.name, _b = _a.handler, handler = _b === void 0 ? name && options.builder.getExecuteHandler(name, false) : _b;
        if (handler) {
            var result = handler(new BaseValidator().invoke(context));
            (isObservable(result) ? result : of(result)).subscribe(function (fn) { return validatorFn = fn; });
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
    ControlIntercept.prototype.getOption = function (configs, options, isAsync) {
        var _this = this;
        var filterConfig = configs.filter(function (_a) {
            var async = _a.async;
            return isAsync ? async : !async;
        });
        return filterConfig.map(function (config) { return _this.getValidatorFn(config, options); });
    };
    ControlIntercept.prototype.updateValidators = function (validators, options) {
        var control = options.builderField.control;
        if (control) {
            control.clearValidators();
            control.setValidators(this.getOption(validators, options));
            control.setAsyncValidators(this.getOption(validators, options, true));
        }
    };
    ControlIntercept.prototype.create = function (value, options) {
        return this.createFormControl(value, {}, options);
    };
    __decorate([
        Inject(GET_TYPE),
        __metadata("design:type", Object)
    ], ControlIntercept.prototype, "getType", void 0);
    __decorate([
        Inject(CREATE_FORM_CONTROL),
        __metadata("design:type", Function)
    ], ControlIntercept.prototype, "createFormControl", void 0);
    ControlIntercept = __decorate([
        Intercept(),
        __metadata("design:paramtypes", [Injector])
    ], ControlIntercept);
    return ControlIntercept;
}());
export { ControlIntercept };
