import { __decorate, __metadata } from "tslib";
import { Inject, Injector, InjectorToken } from '@fm/di';
import { GET_TYPE } from '@dynamic/builder';
import { ControlIntercept, VALIDATOR } from '../../builder/builder-context';
import { BaseValidator } from './base-validator';
export const CREATE_FORM_CONTROL = InjectorToken.get('CREATE_FORM_CONTROL');
let Control = class Control {
    constructor(injector) {
        this.injector = injector;
    }
    getValidatorFn(config, options) {
        let validatorFn;
        const context = Object.assign(Object.assign({}, options), { config });
        const builderHandler = options.builder.getExecuteHandler(config.name, false);
        if (builderHandler) {
            validatorFn = builderHandler(new BaseValidator().invoke(Object.assign({ injector: this.injector }, context)));
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
        return this.createFormControl(value, controlOptions);
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
