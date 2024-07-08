/* eslint-disable max-lines-per-function */
import { useBuilderContext } from '@hwy-fm/builder';
import { InjectorToken, makeDecorator } from '@hwy-fm/di';
export const VALIDATOR = InjectorToken.get('VALIDATOR');
export const FORWARD_MICRO = InjectorToken.get('FORWARD_MICRO');
export const FORWARD_BUILDER = InjectorToken.get('FORWARD_BUILDER');
export const CONTROL_INTERCEPT = InjectorToken.get('CONTROL_INTERCEPT');
export const builderPackage = (baseName, parent) => {
    const getName = (name) => baseName + name;
    const builderContext = useBuilderContext(parent);
    const validatorProps = (name) => ({ name });
    const actionProps = (name, options) => ({ name, options });
    const Convert = makeDecorator(getName('Convert'), undefined, (Type, name) => {
        builderContext.forwardConvert(name, Type);
    });
    const Action = makeDecorator(getName('Action'), actionProps, (Type, name, options) => {
        builderContext.forwardAction(name, Type, options);
    });
    const Validator = makeDecorator(getName('Validator'), validatorProps, (Type, name) => {
        builderContext.forwardType(VALIDATOR, name, Type, 'validator');
    });
    const ControlIntercept = makeDecorator(getName('ControlIntercept'), undefined, (Type) => {
        builderContext.forwardClass(CONTROL_INTERCEPT, Type);
    });
    const Extension = makeDecorator(getName('Extension'), undefined, (Extension) => {
        builderContext.registryExtension([Extension]);
    });
    const forwardUiElement = (name, Element) => builderContext.forwardUiElement(name, Element);
    const UIElement = (name) => (Type) => forwardUiElement(name, Type);
    const forwardHocComponent = (token, hot) => (builderContext.forwardFactory(token, hot), hot);
    return { builderContext, forwardUiElement, forwardHocComponent, UIElement, ControlIntercept, Convert, Action, Validator, Extension };
};
// eslint-disable-next-line max-len
export const { builderContext, forwardUiElement, forwardHocComponent, UIElement, Validator, ControlIntercept, Convert, Action, Extension } = builderPackage('Root');
