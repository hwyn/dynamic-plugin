import { __decorate, __metadata } from "tslib";
import { GET_TYPE, serializeAction } from '@dynamic/builder';
import { Inject, Injector, InjectorToken } from '@fm/di';
import { isObservable, of } from 'rxjs';
import { ControlIntercept, VALIDATOR } from '../../builder/builder-context';
import { BaseValidator } from './base-validator';
export const CREATE_FORM_CONTROL = InjectorToken.get('CREATE_FORM_CONTROL');
let Control = class Control {
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
    create(value, options) {
        const { builderField: { field, field: { validators = [] } } } = options;
        const controlOptions = {
            validators: this.getOption(validators, options),
            asyncValidators: this.getOption(validators, options, true)
        };
        delete field.validators;
        return this.createFormControl(value, controlOptions, options);
    }
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
export { Control };
