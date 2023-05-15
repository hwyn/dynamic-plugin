"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = exports.CREATE_FORM_CONTROL = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@dynamic/builder");
var di_1 = require("@fm/di");
var builder_context_1 = require("../../builder/builder-context");
var base_validator_1 = require("./base-validator");
exports.CREATE_FORM_CONTROL = di_1.InjectorToken.get('CREATE_FORM_CONTROL');
var Control = /** @class */ (function () {
    function Control(injector) {
        this.injector = injector;
    }
    Control.prototype.getValidatorFn = function (config, options) {
        var validatorFn;
        var context = tslib_1.__assign(tslib_1.__assign({}, options), { config: config });
        var builderHandler = options.builder.getExecuteHandler(config.name, false);
        if (builderHandler) {
            validatorFn = builderHandler(new base_validator_1.BaseValidator().invoke(tslib_1.__assign({ injector: this.injector }, context)));
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
    tslib_1.__decorate([
        (0, di_1.Inject)(builder_1.GET_TYPE),
        tslib_1.__metadata("design:type", Object)
    ], Control.prototype, "getType", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(exports.CREATE_FORM_CONTROL),
        tslib_1.__metadata("design:type", Function)
    ], Control.prototype, "createFormControl", void 0);
    Control = tslib_1.__decorate([
        (0, builder_context_1.ControlIntercept)(),
        tslib_1.__metadata("design:paramtypes", [di_1.Injector])
    ], Control);
    return Control;
}());
exports.Control = Control;
