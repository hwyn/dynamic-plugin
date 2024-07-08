"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlIntercept = exports.CREATE_FORM_CONTROL = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@hwy-fm/builder");
var di_1 = require("@hwy-fm/di");
var rxjs_1 = require("rxjs");
var builder_context_1 = require("../../builder/builder-context");
var base_validator_1 = require("./base-validator");
exports.CREATE_FORM_CONTROL = di_1.InjectorToken.get('CREATE_FORM_CONTROL');
var ControlIntercept = /** @class */ (function () {
    function ControlIntercept(injector) {
        this.injector = injector;
    }
    ControlIntercept.prototype.getValidatorFn = function (config, options) {
        var validatorFn;
        var context = tslib_1.__assign(tslib_1.__assign({ injector: this.injector }, options), { config: config });
        var _a = (0, builder_1.serializeAction)(config), name = _a.name, _b = _a.handler, handler = _b === void 0 ? name && options.builder.getExecuteHandler(name, false) : _b;
        if (handler) {
            var result = handler(new base_validator_1.BaseValidator().invoke(context));
            ((0, rxjs_1.isObservable)(result) ? result : (0, rxjs_1.of)(result)).subscribe(function (fn) { return validatorFn = fn; });
        }
        if (!validatorFn) {
            var validatorType = config instanceof base_validator_1.BaseValidator ? config : this.getType(builder_context_1.VALIDATOR, config.name);
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
    tslib_1.__decorate([
        (0, di_1.Inject)(builder_1.GET_TYPE),
        tslib_1.__metadata("design:type", Object)
    ], ControlIntercept.prototype, "getType", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(exports.CREATE_FORM_CONTROL),
        tslib_1.__metadata("design:type", Function)
    ], ControlIntercept.prototype, "createFormControl", void 0);
    ControlIntercept = tslib_1.__decorate([
        (0, builder_context_1.ControlIntercept)(),
        tslib_1.__metadata("design:paramtypes", [di_1.Injector])
    ], ControlIntercept);
    return ControlIntercept;
}());
exports.ControlIntercept = ControlIntercept;
