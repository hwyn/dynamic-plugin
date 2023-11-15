import { __decorate, __metadata } from "tslib";
import { GET_TYPE, serializeAction } from '@dynamic/builder';
import { Inject, Injector, InjectorToken } from '@fm/di';
import { isObservable, of } from 'rxjs';
import { ControlIntercept as Intercept, VALIDATOR } from '../../builder/builder-context';
import { BaseValidator } from './base-validator';
export const CREATE_FORM_CONTROL = InjectorToken.get('CREATE_FORM_CONTROL');
let ControlIntercept = class ControlIntercept {
    constructor(injector) {
        this.injector = injector;
    }
    getValidatorFn(config, options) {
        let validatorFn;
        const context = Object.assign(Object.assign({ injector: this.injector }, options), { config });
        const { name, handler = name && options.builder.getExecuteHandler(name, false) } = serializeAction(config);
        if (handler) {
            const result = handler(new BaseValidator().invoke(context));
            (isObservable(result) ? result : of(result)).subscribe((fn) => validatorFn = fn);
        }
        if (!validatorFn) {
            const validatorType = config instanceof BaseValidator ? config : this.getType(VALIDATOR, config.name);
            const validator = validatorType && this.injector.get(validatorType).invoke(context);
            if (!validator) {
                console.info(`validator: ${config.name}没有注册`);
            }
            validatorFn = (control) => (validator === null || validator === void 0 ? void 0 : validator.validator(control)) || null;
        }
        return validatorFn;
    }
    getOption(configs, options, isAsync) {
        const filterConfig = configs.filter(({ async }) => isAsync ? async : !async);
        return filterConfig.map((config) => this.getValidatorFn(config, options));
    }
    updateValidators(validators, options) {
        const { builderField: { control } } = options;
        if (control) {
            control.clearValidators();
            control.setValidators(this.getOption(validators, options));
            control.setAsyncValidators(this.getOption(validators, options, true));
        }
    }
    create(value, options) {
        return this.createFormControl(value, {}, options);
    }
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
export { ControlIntercept };
