import { useBuilderContext } from '@dynamic/builder';
import { InjectorToken, makeDecorator } from '@fm/di';
export const VALIDATOR = InjectorToken.get('VALIDATOR');
export const FORWARD_MICRO = InjectorToken.get('FORWARD_MICRO');
export const FORWARD_BUILDER = InjectorToken.get('FORWARD_BUILDER');
export const CONTROL_INTERCEPT = InjectorToken.get('CONTROL_INTERCEPT');
export const builderPackage = (baseName, parent) => {
    const getName = (name) => baseName + name;
    const builderContext = useBuilderContext(parent);
    const Convert = makeDecorator(getName('Convert'), undefined, (Type, name) => {
        builderContext.forwardConvert(name, Type);
    });
    const Action = makeDecorator(getName('Action'), undefined, (Type, name, options) => {
        builderContext.forwardAction(name, Type, options);
    });
    const Validator = makeDecorator(getName('Validator'), undefined, (Type, name) => {
        builderContext.forwardType(VALIDATOR, name, Type, 'validator');
    });
    const ControlIntercept = makeDecorator(getName('ControlIntercept'), undefined, (Type) => {
        builderContext.forwardClass(CONTROL_INTERCEPT, Type);
    });
    const Extension = makeDecorator(getName('Extension'), undefined, (Extension) => {
        builderContext.registryExtension([Extension]);
    });
    const forwardUiElement = (name, Element) => builderContext.forwardUiElement(name, Element);
    const forwardHocComponent = (token, hot) => (builderContext.forwardFactory(token, hot), hot);
    return { builderContext, forwardUiElement, forwardHocComponent, ControlIntercept, Convert, Action, Validator, Extension };
};
// eslint-disable-next-line max-len
export const { builderContext, forwardUiElement, forwardHocComponent, Validator, ControlIntercept, Convert, Action, Extension } = builderPackage('Root');
