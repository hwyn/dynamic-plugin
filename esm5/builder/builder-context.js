var _a;
/* eslint-disable max-lines-per-function */
import { useBuilderContext } from '@hwy-fm/builder';
import { InjectorToken, makeDecorator } from '@hwy-fm/di';
export var VALIDATOR = InjectorToken.get('VALIDATOR');
export var FORWARD_MICRO = InjectorToken.get('FORWARD_MICRO');
export var FORWARD_BUILDER = InjectorToken.get('FORWARD_BUILDER');
export var CONTROL_INTERCEPT = InjectorToken.get('CONTROL_INTERCEPT');
export var builderPackage = function (baseName, parent) {
    var getName = function (name) { return baseName + name; };
    var builderContext = useBuilderContext(parent);
    var validatorProps = function (name) { return ({ name: name }); };
    var actionProps = function (name, options) { return ({ name: name, options: options }); };
    var Convert = makeDecorator(getName('Convert'), undefined, function (Type, name) {
        builderContext.forwardConvert(name, Type);
    });
    var Action = makeDecorator(getName('Action'), actionProps, function (Type, name, options) {
        builderContext.forwardAction(name, Type, options);
    });
    var Validator = makeDecorator(getName('Validator'), validatorProps, function (Type, name) {
        builderContext.forwardType(VALIDATOR, name, Type, 'validator');
    });
    var ControlIntercept = makeDecorator(getName('ControlIntercept'), undefined, function (Type) {
        builderContext.forwardClass(CONTROL_INTERCEPT, Type);
    });
    var Extension = makeDecorator(getName('Extension'), undefined, function (Extension) {
        builderContext.registryExtension([Extension]);
    });
    var forwardUiElement = function (name, Element) { return builderContext.forwardUiElement(name, Element); };
    var UIElement = function (name) { return function (Type) { return forwardUiElement(name, Type); }; };
    var forwardHocComponent = function (token, hot) { return (builderContext.forwardFactory(token, hot), hot); };
    return { builderContext: builderContext, forwardUiElement: forwardUiElement, forwardHocComponent: forwardHocComponent, UIElement: UIElement, ControlIntercept: ControlIntercept, Convert: Convert, Action: Action, Validator: Validator, Extension: Extension };
};
// eslint-disable-next-line max-len
export var builderContext = (_a = builderPackage('Root'), _a.builderContext), forwardUiElement = _a.forwardUiElement, forwardHocComponent = _a.forwardHocComponent, UIElement = _a.UIElement, Validator = _a.Validator, ControlIntercept = _a.ControlIntercept, Convert = _a.Convert, Action = _a.Action, Extension = _a.Extension;
